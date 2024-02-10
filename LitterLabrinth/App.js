import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Camera } from 'expo-camera';

var experience = 0;

// CustomButton component
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// App component
export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null); // Create a ref for the camera
  const [markerCoords, setMarkerCoords] = useState(null);

  const addMarker = (coordinate) => {
    setMarkerCoords(coordinate);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) { // Check if cameraRef is available
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      experience++;
      closeCamera();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashTag</Text>
      <Text style={styles.experience}>User experience: {experience}</Text>
      <View style={styles.contentContainer}>
        {isCameraOpen ? (
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
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
              showsUserLocation = {true}
              followsUserLocation = {true}
              initialRegion={{
                latitude: 29.651634,
                longitude: -82.324829,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onPress={(event) => addMarker(event.nativeEvent.coordinate)}
            >
              {markerCoords && (
                <Marker coordinate={markerCoords} title="Selected Location" />
              )}
            </MapView>
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
    width: '100%',
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
