import GoogleTextInput from "@/components/GoogleTextInput";
import Mapa from "@/components/Map";
import * as Location from "expo-location";
import RideCard from "@/components/RideCard";
import { icons, zdjecia } from "@/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "@/store";
import { useFetch } from "@/lib/fetch";
import { Miejsce } from "@/types/type";

const Home = () => {
  const { user } = useUser();
  const handleSignOut = () => {};
  const handleDestinationPress = () => {};
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const {
    data: ciekaweMiejsca,
    loading,
    error,
  } = useFetch<Miejsce[]>("/(api)/miejsce/miejsce");

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update when user moves 10 meters
        },
        async (location) => {
          const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: `${address[0]?.name || "Unknown"}, ${address[0]?.region || "Unknown"}`,
          });
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={ciekaweMiejsca?.slice(0, 5)} // Przekazanie płaskiej tablicy
        keyExtractor={(item) => item.miejsce_id?.toString() || "default_key"}
        // Ustawienie unikalnego klucza
        renderItem={({ item }) => <RideCard miejsce={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }} // Renderowanie każdego elementu
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={zdjecia.noResult}
                  className="w-40 h-40"
                  alt="Brak rides"
                  resizeMode="contain"
                ></Image>
                <Text className="text-sm">Brak rides</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000"></ActivityIndicator>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold capitalize">
                Witam
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
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
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
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
