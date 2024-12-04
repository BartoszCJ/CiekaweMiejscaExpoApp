import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <View className="shadow-xl shadow-black elevation-5 rounded-md p-1 bg-white">
          <Text className="text-black text-md font-JakartaBold">Pomiń</Text>
        </View>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#33b249] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          /* zdjecue */
          <View key={item.id} className="flex items-center justify-center ">
            <View className="shadow-2xl shadow-black overflow-hidden w-full h-[350px]">
              <Image
                source={item.zdjecie}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            <View className="flex flex-row items-center justify-center w-full mt-10">
              {/* tytul */}
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.tytul}
              </Text>
            </View>
            {/*opis */}
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.opis}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Zarejestruj się" : "Więcej"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-10/12 mt-10 mb-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
