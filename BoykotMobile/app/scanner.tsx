import { CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { useState } from 'react';

export default function CameraScreen() {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const frameWidth = 250;
  const frameHeight = 150;

  const frameLeft = (screenWidth - frameWidth) / 2;
  const frameTop = (screenHeight - frameHeight) / 2;

  const isPointInsideFrame = (x, y, frameLeft, frameTop, frameWidth, frameHeight) => {
  return (
    x >= frameLeft &&
    x <= frameLeft + frameWidth &&
    y >= frameTop &&
    y <= frameTop + frameHeight
  );
};

const isBarcodeInsideFrame = (cornerPoints, frameLeft, frameTop, frameWidth, frameHeight) => {
  if (!cornerPoints || cornerPoints.length < 4) return false;

  // Tüm köşeler çerçevenin içinde mi?
  return cornerPoints.every(({ x, y }) =>
    isPointInsideFrame(x, y, frameLeft, frameTop, frameWidth, frameHeight)
  );
};

  const handleBarcodeScanned = (data) => {
  if (scanned) return;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const frameWidth = 250;
  const frameHeight = 150;

  const frameLeft = (screenWidth - frameWidth) / 2;
  const frameTop = (screenHeight - frameHeight) / 2;

  if (!isBarcodeInsideFrame(data.cornerPoints, frameLeft, frameTop, frameWidth, frameHeight)) {
    return;
  }

  setScanned(true);

  router.back();
  router.push({
    pathname: '/',
    params: { scanValue: data.data },
  });
};

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ headerShown: false, title: "Camera" }} />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scannerFrame} />
          <Text style={styles.instruction}>Lütfen barkodu çerçeveye hizalayın</Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  instruction: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
  },
});
