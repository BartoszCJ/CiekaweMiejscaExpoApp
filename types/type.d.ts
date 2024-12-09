import { TextInputProps, TouchableOpacityProps } from "react-native";

interface Kontakt {
  telefon: string;
  email: string;
  strona_www: string;
}

declare global {
  interface MapaRef {
    zoomToPlace: (latitude: number, longitude: number) => void;
  }
}

interface Miejsce {
  miejsce_id: string;
  address: string;
  latitude: string;
  longitude: string;
  user_id: string;
  dodano: string;
  nazwa: string;
  kategoria: string;
  opis: string;
  ocena: string;
  image_url: string;
  kontakt: Kontakt;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  containerStyle?: object; 
  textInputBackgroundColor?: string;
  ciekaweMiejsca?: Miejsce[]; 
  error?: Error | null; // Add this prop to the type definition
  handlePress: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  setUserLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}
