import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Camera } from 'expo-camera';

// CustomButton component
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// App component
export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashTag</Text>
      <View style={styles.contentContainer}>
        {isCameraOpen ? (
          <Camera style={styles.camera} type={Camera.Constants.Type.back}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => takePicture()}>
              <Text style={styles.cameraButtonText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraCloseButton} onPress={closeCamera}>
              <Text style={styles.cameraCloseButtonText}>Close Camera</Text>
            </TouchableOpacity>
          </Camera>
        ) : (
          <>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 29.651634,
                longitude: -82.324829,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <CustomButton title="Open Camera" onPress={openCamera} />
          </>
        )}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#8CC152",
    paddingTop: 50, // Adjust top padding
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 50,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20, // Adjust top padding
  },
  map: {
    width: '80%',
    height: '60%',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cameraCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  cameraCloseButtonText: {
    color: 'white',
  },
});
