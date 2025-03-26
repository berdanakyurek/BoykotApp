import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
            headerShown: false,
            title: "Camera"
        }}
      />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={(data) => {
          console.log(data.data);
          router.back();
          router.push({
            pathname: '/',
            params: { scanValue: data.data }
          });
        }}
      />
    </SafeAreaView>
  );
}
