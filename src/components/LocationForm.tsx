"use client";

import { useState } from "react";
import { useLocations } from "@/context/LocationsContext";

export default function LocationForm() {
  const { addLocation } = useLocations();

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !lat || !lng) return alert("Lütfen tüm alanları doldurun!");

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum))
      return alert("Lütfen geçerli bir enlem ve boylam girin!");

    addLocation({
      id: Date.now(),
      name,
      lat: latNum,
      lng: lngNum,
    });
    setName("");
    setLat("");
    setLng("");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input
        type="text"
        placeholder="Konum Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        placeholder="Enlem (Latitude)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        placeholder="Boylam (Longitude)"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        className="w-full py-3 mb-4 bg-[#21445B] hover:bg-[#1b3651] text-white font-semibold rounded-md transition"
      >
        Konum Ekle
      </button>
    </form>
  );
}
