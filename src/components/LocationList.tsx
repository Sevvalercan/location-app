"use client";

import { useState } from "react";
import { useLocations } from "@/context/LocationsContext";

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

export default function LocationList() {
  const { locations, removeLocation, editLocation } = useLocations();

  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", lat: "", lng: "" });

  const startEdit = (loc: Location) => {
    setEditId(loc.id);
    setFormData({
      name: loc.name,
      lat: loc.lat.toString(),
      lng: loc.lng.toString(),
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ name: "", lat: "", lng: "" });
  };

  const saveEdit = () => {
    if (!formData.name || !formData.lat || !formData.lng) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    const latNum = parseFloat(formData.lat);
    const lngNum = parseFloat(formData.lng);
    if (isNaN(latNum) || isNaN(lngNum)) {
      alert("Enlem ve boylam geçerli sayılar olmalı!");
      return;
    }

    editLocation({
      id: editId!,
      name: formData.name,
      lat: latNum,
      lng: lngNum,
    });
    cancelEdit();
  };

  return (
    <ul className="mt-8 space-y-4 max-h-[300px] overflow-y-auto">
      {locations.length === 0 && (
        <p className="text-center text-gray-500">Henüz konum yok.</p>
      )}

      {locations.map((loc) => (
        <li
          key={loc.id}
          className="border border-gray-300 rounded-md p-4 bg-[#f7f9fc] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between flex-wrap"
        >
          {editId === loc.id ? (
            <>
              <input
                className="border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 flex-1 min-w-[120px]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Konum Adı"
              />
              <input
                className="border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 w-24 min-w-[120px]"
                value={formData.lat}
                onChange={(e) =>
                  setFormData({ ...formData, lat: e.target.value })
                }
                placeholder="Enlem"
              />
              <input
                className="border rounded px-2 py-1 mb-4 md:mb-0 md:mr-2 w-24 min-w-[120px]"
                value={formData.lng}
                onChange={(e) =>
                  setFormData({ ...formData, lng: e.target.value })
                }
                placeholder="Boylam"
              />
<div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded min-w-[70px]"
                >
                  Kaydet
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-3 py-1 rounded min-w-[70px]"
                >
                  İptal
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 ">
                <strong>{loc.name}</strong> — Enlem: {loc.lat.toFixed(4)} |
                Boylam: {loc.lng.toFixed(4)}
              </div>
              <div className="mt- md:mt-0 flex space-x-2">
                <button
                  onClick={() => startEdit(loc)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded min-w-[70px]"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => removeLocation(loc.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded min-w-[70px]"
                >
                  Sil
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
