import GoogleTextInput from "@/components/GoogleTextInput";
import Mapa from "@/components/Mapa";
import * as Location from "expo-location";
import MiejsceCard from "@/components/MiejsceCard";
import { icons, zdjecia } from "@/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
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

const Home = () => {
  const { user } = useUser();
  const { ciekaweMiejsca, loading, error, fetchMiejsca } = useMiejsceStore();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState(false);

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
          Alert.alert(
            "Location Permission Required",
            "Please enable location permissions in your device settings."
          );
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 10, // Update every 10 meters
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
        console.error("Error in location tracking:", error.message);
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={ciekaweMiejsca || []}
        keyExtractor={(item) =>
          item.miejsce_id?.toString() || `key-${Math.random()}`
        }
        renderItem={({ item }) => <MiejsceCard miejsce={item} />}
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
                <Text className="text-sm">Brak rides</Text>
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
                onPress={() => {}}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              ciekaweMiejsca={ciekaweMiejsca} // Pass the places as a prop
              error={error} // Pass the error state
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Twoja lokalizacja
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Mapa />
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
