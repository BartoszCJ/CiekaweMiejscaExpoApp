import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const ciekaweMiejsca = [
  {
    miejsce_id: "1",
    address: "Brama Wybrańców 1, Pszczyna",
    latitude: "49.97829653691428",
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
  {
    miejsce_id: "2",
    address: "Rynek Główny, Kraków",
    latitude: 50.0619474,
    longitude: 19.9368564,
    nazwa: "Rynek Główny",
    opis: "Największy rynek średniowieczny w Europie",
    ocena: "5",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Krakow_-_Rynek_Glowny.jpg",
    kontakt: {
      telefon: "+48 123 456 789",
      email: "kontakt@zamekpszczyna.pl",
      strona_www: "https://www.zamekpszczyna.pl",
    },
  },
];

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState(ciekaweMiejsca);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = ciekaweMiejsca.filter(
      (place) =>
        place.nazwa.toLowerCase().includes(query.toLowerCase()) ||
        place.opis.toLowerCase().includes(query.toLowerCase()) ||
        place.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  return (
    <View
      className={`flex flex-col ${containerStyle}`}
      style={{
        backgroundColor: textInputBackgroundColor || "white",
        borderRadius: 20,
      }}
    >
      {/* Search Input */}
      <View className="flex flex-row items-center p-4">
        <Image
          source={icon || icons.search}
          className="w-6 h-6"
          resizeMode="contain"
          style={{ marginRight: 10 }}
        />
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a place"
          placeholderTextColor="gray"
          className="flex-1 text-base"
          style={{
            fontSize: 16,
            color: "#000",
            padding: 5,
          }}
        />
      </View>

      {/* Conditionally Rendered Filtered Results */}
      {isFocused && (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.miejsce_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setIsFocused(false); // Hide the list when an item is selected
                handlePress({
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                  address: item.address,
                });
              }}
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.nazwa}
                </Text>
                <Text style={{ fontSize: 12, color: "#666" }}>{item.opis}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text className="text-center py-4 text-gray-500">
              No results found
            </Text>
          )}
          style={{
            maxHeight: 300,
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};

export default GoogleTextInput;
