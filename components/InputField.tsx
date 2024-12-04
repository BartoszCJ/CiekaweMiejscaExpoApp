import { InputFieldProps } from "@/types/type";
import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  label,
  labelStyle = "",
  icon,
  secureTextEntry = false,
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    className="w-full"
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2">
        {label && (
          <Text className={`text-lg font-semibold mb-3 ${labelStyle}`}>
            {label}
          </Text>
        )}
        <View
          className={`flex flex-row items-center bg-neutral-100 rounded-full border border-neutral-200 px-4 ${containerStyle}`}
        >
          {icon && (
            <Image
              source={icon}
              className={`w-6 h-6 mr-4 ${iconStyle}`}
              resizeMode="contain"
            />
          )}
          <TextInput
            className={`flex-1 h-12 text-base font-medium text-left text-neutral-900 ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
