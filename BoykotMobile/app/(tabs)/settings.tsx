import { StatusBar, StyleSheet, Image, Platform, View, FlatList, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGetTagsQuery } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Snackbar, Portal } from 'react-native-paper';

const getUserTags = async () => {
  try {
    let v = await AsyncStorage.getItem('userTags');
    if (v == null) return [] as string[];
    return await JSON.parse(v) as string[];
  } catch(e) {
    console.error(e);
  }
};

export default function TabTwoScreen() {
  const query = useGetTagsQuery();
  const [userTags, setUserTags] = useState<Array<string>>([]);
  const [successSnackbarVisible, setSuccessSnackbarVisible] = useState(false);
  useEffect( () => {
    const fetchUserTags = async () => {
      const v = await getUserTags();
      setUserTags(v || []);
    };

    fetchUserTags();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ayarlar</ThemedText>
      </ThemedView>

      <Collapsible title="Boykot Listesi">
        <ThemedText>Katıldığınız Boykotları Seçin:</ThemedText>
        {
          query.data ? query?.data?.map((item, i)=> (
            <View style={styles.checkboxContainer} key={i}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => {
                  if(isChecked)
                  {
                    let newTags = [...userTags];
                    newTags.push(item.id);
                    setUserTags(newTags);
                  }
                  else
                  {
                    let newTags = userTags.filter(f => f != item.id);
                    setUserTags(newTags);
                  }
                }}
                isChecked={userTags.includes(item.id)}
              />
              <ThemedText style={styles.label}>{item.name}</ThemedText>
            </View>
          )) : null
        }
        <Button
           onPress={() => {
             AsyncStorage.setItem('userTags', JSON.stringify(userTags));
             setSuccessSnackbarVisible(true);
           }}
           title="Kaydet"
        />
        <Portal>
          <Snackbar
            wrapperStyle={styles.snackbarWrapper}
            style={styles.successSnackbar}
            visible={successSnackbarVisible}
            onDismiss={() => {setSuccessSnackbarVisible(false)}}
            duration={2000}
          >
          <ThemedText style={styles.successSnackbarText}>İşlem başarılı!</ThemedText>
          </Snackbar>
        </Portal>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  successSnackbar: {
    backgroundColor: 'green',
  },
  successSnackbarText: {
    color: "white",
    textAlign: 'center'
  },
  snackbarWrapper: {
    top: StatusBar.currentHeight,
    bottom: undefined,
  },

});
