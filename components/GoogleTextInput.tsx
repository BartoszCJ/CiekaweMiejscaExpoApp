import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps, Miejsce } from "@/types/type";
import { useFetch } from "@/lib/fetch";
import { useLocationStore, useMiejsceStore } from "@/store";

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<Miejsce[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const {
    ciekaweMiejsca,
    loading: placesLoading,
    error,
    fetchMiejsca,
  } = useMiejsceStore();
  // Fetch places if not already loaded
  useEffect(() => {
    if (!ciekaweMiejsca) {
      fetchMiejsca();
    }
  }, [ciekaweMiejsca, fetchMiejsca]);


  // Update filtered places when search query or fetched data changes
  useEffect(() => {
    if (ciekaweMiejsca) {
      const filtered = ciekaweMiejsca.filter(
        (place) =>
          place.nazwa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.opis.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  }, [searchQuery, ciekaweMiejsca]);



  if (error) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Failed to load places. Please try again later.
        </Text>
      </View>
    );
  }


  return (
    <View
      style={{
        backgroundColor: textInputBackgroundColor || "white",
        borderRadius: 20,
        ...containerStyle,
      }}
    >
      {/* Search Input */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Image
          source={icon || icons.search}
          style={{ width: 24, height: 24, marginRight: 10 }}
          resizeMode="contain"
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a place"
          placeholderTextColor="gray"
          style={{
            flex: 1,
            fontSize: 16,
            color: "#000",
            padding: 5,
          }}
        />
      </View>

      {/* Conditionally Render Filtered Results */}
      {isFocused && (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.miejsce_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
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
                <Text style={{ fontSize: 12, color: "#666" }}>
                  {item.opis}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", padding: 20, color: "#666" }}>
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
