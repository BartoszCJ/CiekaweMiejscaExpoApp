import { Image, Text, View } from "react-native";
import { icons } from "@/constants";
import { Miejsce } from "@/types/type";

const RideCard = ({ miejsce }: { miejsce: Miejsce }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{ uri: miejsce.image_url }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {miejsce.nazwa}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {miejsce.address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Kategoria
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {miejsce.kategoria}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Kontakt
            </Text>
            <Text className="text-md font-JakartaBold">
              {miejsce.kontakt.strona_www ||
                miejsce.kontakt.telefon ||
                miejsce.kontakt.email ||
                "Brak"}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Ocena
            </Text>
            <Text className="text-md font-JakartaBold">{miejsce.ocena}</Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Opis miejsca
            </Text>
            <Text className={"text-sm font-JakartaBold"}>{miejsce.opis}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
