import { create } from "zustand";
import { LocationStore, Miejsce } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  destinationLatitude: null,
  destinationLongitude: null,
  selectedLocation: null,
  setUserLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
    }));
  },
 
  setDestinationLocation: ({
    latitude,
    longitude,
  
  }: {
    latitude: number;
    longitude: number;

  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    }));
  },
}));

interface MiejsceStore {
  ciekaweMiejsca: Miejsce[] | null;
  loading: boolean;
  error: Error | null;
  fetchMiejsca: () => void;
}

export const useMiejsceStore = create<MiejsceStore>((set) => ({
  ciekaweMiejsca: null,
  loading: false,
  error: null,
  fetchMiejsca: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/(api)/miejsce/miejsce");
      const json = await response.json();
      set({ ciekaweMiejsca: json.data || [], loading: false });
    } catch (err) {
      console.error("Error fetching miejsca:", err);
      set({ error: err as Error, loading: false });
    }
  },
}));
