import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
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
const ciekaweMiejsca = [
  {
    miejsce_id: "1",
    address: "Brama Wybrańców 1, Pszczyna",
    latitude: "49.97829653691428,",
    longitude: "18.94047034029246",
    user_id: "1",
    dodano: "2024-08-12",
    nazwa: "Zamek Pszczyński",
    kategoria: "Historia",
    opis: "Piękny zamek oraz muzeum",
    ocena: "5",
    image_url:
      "https://media.istockphoto.com/id/92239299/pl/zdj%C4%99cie/zamek-pszczyna-polska.jpg?s=2048x2048&w=is&k=20&c=I0LyRVys7Htz8PzlDRPlu9rz1xLOr20Mntw1CwnXtbU=",
    kontakt: {
      telefon: "+48 123 456 789",
      email: "kontakt@zamekpszczyna.pl",
      strona_www: "https://www.zamekpszczyna.pl",
    },
  },
];

const Home = () => {
  const { user } = useUser();
  const loading = true;
  const handleSignOut = () => {};
  const handleDestinationPress = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={ciekaweMiejsca.slice(0, 5)} // Przekazanie płaskiej tablicy
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
                <Map />
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
