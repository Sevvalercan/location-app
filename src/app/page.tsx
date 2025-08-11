"use client";

import LocationForm from "@/components/LocationForm";
import LocationList from "@/components/LocationList";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg m-6 border border-gray-">
      <h1 className="text-3xl font-semibold text-[#21445B] mb-6 text-center">
        Konum Uygulaması
      </h1>

      <LocationForm />

      <Map />

      <LocationList />
    </main>
  );
}
