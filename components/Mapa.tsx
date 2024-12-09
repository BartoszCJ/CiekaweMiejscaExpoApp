import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocationStore, useMiejsceStore } from "@/store";

const Mapa = () => {
  const { userLatitude, userLongitude } = useLocationStore();
  const {
    ciekaweMiejsca,
    loading: placesLoading,
    error,
    fetchMiejsca,
  } = useMiejsceStore();

  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  useEffect(() => {
    console.log("Location updated:", { userLatitude, userLongitude });
  }, [userLatitude, userLongitude]);
 
    
  useEffect(() => {
    if (!ciekaweMiejsca) {
      fetchMiejsca();
    }
  }, [ciekaweMiejsca, fetchMiejsca]);

  useEffect(() => {
    console.log("ciekaweMiejsca updated:", ciekaweMiejsca);
  }, [ciekaweMiejsca]);

  const defaultRegion = {
    latitude: userLatitude || 50.0, // Fallback to a default latitude
    longitude: userLongitude || 19.0, // Fallback to a default longitude
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  // Show loading until user location and places are loaded
  if (!userLatitude || !userLongitude || placesLoading || !ciekaweMiejsca) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading map data...</Text>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error fetching places: {error.message}</Text>
      </View>
    );
  }
  
  return (
    <MapView
      key={`${userLatitude}-${userLongitude}`}
      style={StyleSheet.absoluteFill}
      region={defaultRegion}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >

      {ciekaweMiejsca.map((miejsce) => (
        <Marker
          key={miejsce.miejsce_id}
          coordinate={{
            latitude: parseFloat(miejsce.latitude),
            longitude: parseFloat(miejsce.longitude),
          }}
          title={miejsce.nazwa}
          description={miejsce.opis}
          onPress={() => setSelectedMarker(miejsce.miejsce_id)}
        />
      ))}
    </MapView>
  );
};

export default Mapa;
