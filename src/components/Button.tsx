"use client";

import { useLocations } from "@/context/LocationsContext";

export default function Home() {
  const { locations, addLocation } = useLocations();

  return (
    <main className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-[#21445B] mb-6 text-center">
        Konum Uygulaması
      </h1>

      <button
        onClick={() =>
          addLocation({
            id: Date.now(),
            name: "Diyarbakır",
            lat: 37.9144,
            lng: 40.2306,
          })
        }
        className="w-full py-3 bg-[#21445B] hover:bg-[#1b3651] text-white font-semibold rounded-md transition"
      >
        Yeni Konum Ekle
      </button>

      <ul className="mt-8 space-y-4 max-h-[300px] overflow-y-auto">
        {locations.length === 0 && (
          <p className="text-center text-gray-500">Henüz konum yok.</p>
        )}

        {locations.map((loc) => (
          <li
            key={loc.id}
            className="border border-gray-300 rounded-md p-4 bg-[#f7f9fc] shadow-sm"
          >
            <h2 className="font-semibold text-lg text-[#21445B]">{loc.name}</h2>
            <p className="text-sm text-gray-600">
              Enlem: {loc.lat.toFixed(4)} | Boylam: {loc.lng.toFixed(4)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
