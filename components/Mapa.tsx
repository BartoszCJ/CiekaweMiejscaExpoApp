import React, { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocationStore, useMiejsceStore } from "@/store";

const Mapa = React.forwardRef((props, ref) => {
  const { userLatitude, userLongitude } = useLocationStore();
  const { ciekaweMiejsca, loading: placesLoading, error } = useMiejsceStore();

  const mapRef = useRef<MapView>(null);

  React.useImperativeHandle(ref, () => ({
    zoomToPlace: (latitude: number, longitude: number) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500
        );
      }
    },
  }));

  const defaultRegion = {
    latitude: userLatitude || 50.0,
    longitude: userLongitude || 19.0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  if (!userLatitude || !userLongitude || placesLoading || !ciekaweMiejsca) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading map data...</Text>
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
      ref={mapRef}
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
        />
      ))}
    </MapView>
  );
});

export default Mapa;
