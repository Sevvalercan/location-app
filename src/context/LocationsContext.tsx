"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type LocationsContextType = {
  locations: Location[];
  addLocation: (location: Location) => void;
};

const LocationsContext = createContext<LocationsContextType | undefined>(undefined);

const STORAGE_KEY = "konum-app-locations";

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<Location[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    }
  }, [locations]);

  const addLocation = (location: Location) => {
    setLocations((prev) => [...prev, location]);
  };

  return (
    <LocationsContext.Provider value={{ locations, addLocation }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) throw new Error("useLocations must be used within a LocationsProvider");
  return context;
};
