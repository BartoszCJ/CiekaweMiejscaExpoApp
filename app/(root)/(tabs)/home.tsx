import GoogleTextInput from "@/components/GoogleTextInput";
import Mapa from "@/components/Mapa";
import * as Location from "expo-location";
import MiejsceCard from "@/components/MiejsceCard";
import { icons, zdjecia } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore, useMiejsceStore } from "@/store";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

const Home = () => {
  const { user } = useUser();
  const { ciekaweMiejsca, loading, error, fetchMiejsca } = useMiejsceStore();
  const { setUserLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState(false);
  const mapRef = useRef<MapaRef>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    if (!ciekaweMiejsca) {
      fetchMiejsca();
    }
  }, [ciekaweMiejsca, fetchMiejsca]);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startLocationTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Location permission status:", status);

        if (status !== "granted") {
          setHasPermission(false);
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 50,
          },
          async (location) => {
            try {
              const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }).catch(() => [{ name: "Unknown", region: "Unknown" }]);

              setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            } catch (error) {
              console.error("Reverse geocoding error:", error);
            }
          }
        );
      } catch (error) {
        console.error("Error in location tracking:", error);
        Alert.alert("Error", "Unable to fetch location. Please try again.");
      }
    };   

    startLocationTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  if (loading || !ciekaweMiejsca) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  const handleCardPress = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.zoomToPlace(latitude, longitude);
    }
  };
  const handlePlacePress = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    if (mapRef.current) {
      mapRef.current.zoomToPlace(coordinates.latitude, coordinates.longitude);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/welcome");
  };

  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={ciekaweMiejsca || []}
        keyExtractor={(item) =>
          item.miejsce_id?.toString() || `key-${Math.random()}`
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleCardPress(
                parseFloat(item.latitude),
                parseFloat(item.longitude)
              )
            }
          >
            <MiejsceCard miejsce={item} />
          </TouchableOpacity>
        )}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={zdjecia.noResult}
                  className="w-40 h-40"
                  alt="Brak rides"
                  resizeMode="contain"
                />
                <Text className="text-sm">Brak miejsc</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold capitalize">
                Witam{" "}
                {user?.firstName ||
                  user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              handlePress={handlePlacePress}
              containerStyle={styles.containerStyle} // Pass the style object
              ciekaweMiejsca={ciekaweMiejsca} // Pass the places as a prop
              error={error} // Pass the error state
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Twoja lokalizacja
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Mapa ref={mapRef} />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Ciekawe miejsca
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
