import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

// CustomButton component
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);


// App component
export default function App() {

  const [showMarker, setShowMarker] = useState(false)
  const handleButtonPress = () => {
    setShowMarker(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashTag</Text>
      <View style={styles.buttonContainer}>
        <CustomButton title="Press me" onPress={handleButtonPress} />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 29.651634,
          longitude: -82.324829,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >

      {showMarker &&<Marker
        coordinate={{
          latitude: 29.651634,
          longitude: -82.324829,
        }}
        title = "gainesville :)"
        description = "lol"
      />}
    </MapView>
      
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#8CC152"
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  map: {
    width: '80%',
    height: '50%',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
