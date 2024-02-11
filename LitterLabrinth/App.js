import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';


var experience = 0;
var trashDensityText = "Low";
var trashDensityColor = "purple";
var currentLocation;
var markerOpacity = 0.0;
var multiplier = 1;
var densityText = "∇";
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
  const [location, setLocation] = useState(null);
  const [showMarker, setShowMarker] = useState(true);

  const addMarker = (coordinate) => {
    if(coordinate.longitude > -82.34469 && coordinate.longitude < -82.34440)
    {
      if(coordinate.latitude > 29.64820 && coordinate.latitude < 29.64850)
      {
        trashDensityColor = "black";
        trashDensityText = "High";
        multiplier = 3;
        densityText = "Ω";
      }
      
    }
    else if(coordinate.longitude > -82.34500 && coordinate.longitude < -82.34480)
    {
      if(coordinate.latitude > 29.64900 && coordinate.latitude < 29.64920)
      {
        trashDensityText = "Medium";
        trashDensityColor = "yellow";
        multiplier = 2;
        densityText = "Ψ";
      }
      
    }

    else
    {
      trashDensityText = "Low";
      multiplier = 1;
      densityText = "∇";
    }
    setMarkerCoords(coordinate);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      experience += (1 * multiplier);
  
      // Get the current location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log('Location:', location.coords);
        // Set marker coordinates to the location where the picture was taken
        setMarkerCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setShowMarker(true);
      }
  
      closeCamera();
      console.log(JSON.stringify(location));
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashTag</Text>
      <Text style={styles.experience}>User points: {experience}</Text>
      <Text style={styles.trashDensity}>{densityText}</Text>
      <Text style={styles.trashDensityTextT}>{trashDensityText} trash density area!</Text>
      <View style={styles.contentContainer}>
        {isCameraOpen ? (
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraCloseButton} onPress={closeCamera}>
              <Text style={styles.cameraCloseButtonText}>Close Camera</Text>
            </TouchableOpacity>
          </Camera>
        ) : (
          <>
            <MapView
  style={styles.map}
  showsUserLocation={true}
  followsUserLocation={true}
  initialRegion={{
    latitude: 29.64839,
    longitude: -82.34453,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
  onPress={(event) => addMarker(event.nativeEvent.coordinate)}
>
  {showMarker && markerCoords && <Marker coordinate={markerCoords} />}
  <Marker
    coordinate={{ latitude: 29.64839, longitude: -82.34453 }}
    title="High Density"
    pinColor="black"
  />
  <Marker
    coordinate={{ latitude: 29.64910, longitude: -82.34490 }}
    title="Medium Density"
    pinColor="yellow"
  />
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
    backgroundColor: "#8EC152",
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
    marginTop: 10,
    width: '100%',
    height: '70%',
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
    height: '200%',
  },
  cameraButton: {
   // position: 'relative',
    top: 600,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
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
  trashDensity: 
  {
    color: trashDensityColor,
    fontSize: 50,
    marginBottom: 0,
    marginTop: 20,
  },
  trashDensityTextT: 
  {
    color: 'black',
    fontSize: 30,
    marginTop: 0,
    marginBottom: 0
  },
  experience:
  {
    fontSize: 30
  },
});
