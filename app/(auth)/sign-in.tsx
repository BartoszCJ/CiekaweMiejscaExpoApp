import React, { useCallback, useState } from "react";
import { ScrollView, Image, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { zdjecia, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header Section */}
        <View className="relative w-full h-[250px]">
          <Image
            source={zdjecia.rejestracja}
            className="absolute w-full h-full object-cover"
          />
          <Text className="absolute bottom-5 left-5 text-2xl font-semibold text-black">
            Zaloguj się
          </Text>
        </View>

        {/* Form Section */}
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Wprowadź email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Wprowadź hasło"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Zaloguj się"
            onPress={onSignInPress}
            className="mt-6"
          ></CustomButton>
          <OAuth></OAuth>
          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Nie posiadasz konta? </Text>
            <Text className=" text-[#10a028]">Zarejestruj się</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
