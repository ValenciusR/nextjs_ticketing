"use client";

import { useEffect, useState } from "react";
import SearchableDropdown from "../components/searchableDropdown";
import TamuKamarInput from "../components/tamuKamarInput";
import { useRouter } from "next/navigation";

export default function PencarianBar({ searchParam }) {
  const router = useRouter(); // Initialize router
  const cityId = searchParam.destinasi;
  const name = searchParam.destinasi_name;
  const country = searchParam.destinasi_name;
  const date = searchParam.tanggal;
  const roomsCount = searchParam.kamar;
  const adultGuests = searchParam.tamu;
  const [isUbah, setIsUbah] = useState();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    destinasi: {
      id: cityId ? parseInt(cityId, 10) : 0,
      name: name || "",
      country: country || "", // Sesuaikan jika memang ada country terpisah
    },
    tanggal: date || "", // Pastikan date tidak undefined/null
    tamuKamar: {
      tamu: adultGuests || 1, // Default minimal 1 tamu
      kamar: roomsCount || 1, // Default minimal 1 kamar
    },
  });
  console.log("🚀 ~ PencarianBar ~ search:", search);

  const handleSearch = () => {
    // Validate search parameters if needed
    if (!search.tanggal) {
      return;
    }

    // Clear any previous errors

    // Create search parameters string
    const params = new URLSearchParams();
    params.set("destinasi", search.destinasi.id);
    params.set("destinasi_name", search.destinasi.name);
    params.set("destinasi_country", search.destinasi.country);
    params.set("tanggal", search.tanggal);
    params.set("tamu", search.tamuKamar.tamu);
    params.set("kamar", search.tamuKamar.kamar);

    // Navigate using a string path
    router.push(`/search?${params.toString()}`);
  };

  const handleButtonClick = () => {
    if (!isUbah) {
      setIsUbah(true);
    } else {
      handleSearch();
    }
  };

  useEffect(() => {
    // Fetch cities data when component mounts
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cities");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCities(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="flex flex-row justify-between items-center p-5 bg-white rounded-xl shadow-lg">
      {/* Search Input */}
      <div className="flex flex-row items-center gap-5">
        {/* Destinasi */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">
            Pilih Kota/Nama Hotel/ Destinasi
          </p>

          {isUbah ? (
            <SearchableDropdown
              name="destinasi"
              value={search.destinasi}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Pilih nama hotel/destinasi/kota menginap"
              options={cities}
              loading={loading}
            />
          ) : (
            <p className="text-black text-base font-semibold">
              {name || "Belum dipilih"}
            </p>
          )}
        </div>

        {/* Seperator */}
        <div className="border-r border-black h-10"></div>

        {/* Tanggal Menginap */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">Tanggal Menginap</p>
          {isUbah ? (
            <input
              type="date"
              name="tanggal"
              placeholder="Pilih tanggal menginap"
              value={search.tanggal}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl text-xs text-black focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-black text-base font-semibold">{date}</p>
          )}
        </div>

        {/* Seperator */}
        <div className="border-r border-black h-10"></div>

        {/* Tamu Kamar */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">
            Jumlah Tamu dan Kamar
          </p>
          {isUbah ? (
            <TamuKamarInput
              value={search.tamuKamar}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  tamuKamar: e.target.value, // Update based on your TamuKamarInput component
                }))
              }
            />
          ) : (
            <p className="text-black text-base font-semibold">
              {adultGuests} Tamu {roomsCount} Kamar
            </p>
          )}

          {/* <input
              type="text"
              name="destinasi"
              placeholder="Pilih nama hotel/destinasi/kota menginap"
              //   value={search.destinasi}
              //   onChange={(e) =>
              //     setSearch((prev) => ({
              //       ...prev,
              //       [e.target.name]: e.target.value,
              //     }))
              //   }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base text-black focus:outline-none focus:border-blue-500"
            /> */}
        </div>

        {/* Seperator */}
        <div className="border-r border-black h-10"></div>
      </div>

      {/* Ubah Button */}

      <button
        onClick={handleButtonClick}
        className="bg-blue-600 hover:bg-blue-700 text-white  text-xs font-medium py-[15px] px-[25px] h-[44px] rounded-2xl transition whitespace-nowrap"
      >
        Ubah Pencarian
      </button>
    </div>
  );
}
