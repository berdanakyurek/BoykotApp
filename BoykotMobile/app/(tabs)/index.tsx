import { Image, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, Button, Card, Avatar, MD3Colors, List } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQueryBarcodeQuery } from '../../services/api';
import QueryBarcodeResponse from '../../models/QueryBarcodeResponse';
import { useCameraPermissions } from "expo-camera";

import { useLocalSearchParams, useRouter } from 'expo-router';

const getUserTags = async () => {
  try {
    let v = await AsyncStorage.getItem('userTags');
    if (v == null) return [] as string[];
    return await JSON.parse(v) as string[];
  } catch(e) {
    console.error(e);
  }
};

export default function HomeScreen() {

  const [inputValue, setInputValue] = useState<number | null>(null);
  const [userTags, setUserTags] = useState<Array<string>>([]);
  const [response, setResponse] = useState<QueryBarcodeResponse | null>(null);
  const [subtitle, setSubtitle] = useState<string>("");
  const [getBarcode, { isLoading }] = useLazyQueryBarcodeQuery();

  const [ permission, requestPermission ] = useCameraPermissions();

  const router = useRouter();

  const { scanValue } = useLocalSearchParams();

  useEffect(() => {
    if (scanValue) {
      const barcodeNumber = parseInt(scanValue as string);
      if (!isNaN(barcodeNumber)) {
        setInputValue(barcodeNumber);

        router.replace('/');
      }
    }
  }, [scanValue]);

  useEffect( () => {
    const fetchUserTags = async () => {
      const v = await getUserTags();
      setUserTags(v || []);
    };

    fetchUserTags();
  }, []);

  useEffect( () => {
    setSubtitle(generateSubtitle() || "");
  }, [response]);

  const generateSubtitle = () => {
    if(!response)
      return "";
    let res = "Barkod No: " + response.barcodeNumber ;

    if(response.companyName)
      res += "\nFirma: " + response.companyName;
    return res;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <TextInput
          onChangeText={(e) => {
            setInputValue(parseInt(e))
          }}
          value={inputValue ? inputValue.toString() : ''}
          placeholder="Barkod Numarası Girin Veya Kamera İle Barkodu Okutun"
          keyboardType="numeric"
          right={
            <TextInput.Icon
              icon="camera"
              onPress={() => {
                if(!permission?.granted)
                  requestPermission();
                else
                  router.push('/scanner');
              }}
            />
        }
      />
      <Button
          onPress={() => {
            getBarcode({
              barcode: inputValue || 0,
              tagIds: userTags
            }).then((res) => {
              setResponse(res?.data || null);
            }).catch((e) => {
              console.error(e);
            });
          }}
          disabled={inputValue == null}
      >
        Ara
      </Button>
      <ThemedView style={styles.stepContainer}>
      { response &&
        <Card>
          <Card.Title
                left={(props) => <Avatar.Icon
                                   {...props}
                                   icon={response.boykot ? "close-circle" : "check-circle"}
                                   color={response.boykot ? "red" : "green"}
                />}
                title={response.boykot ? "Boykot Ürünü!" : "Boykot Ürünü Değil"}
                subtitle={subtitle}
                subtitleNumberOfLines={10}
          />
          { response.boykot &&
            <Card.Content style={{ padding: 16, gap: 10 }}>
              <ThemedText type="subtitle">İlgili Boykotlar:</ThemedText>
              <List.Section>
                {response.tags.map((b, i) => {
                  return <List.Item key={i} title={b.name} />
                })}
              </List.Section>
            </Card.Content>
          }
        </Card>
      }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
