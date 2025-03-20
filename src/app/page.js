"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import SearchableDropdown from "./components/searchableDropdown"; // Adjust path as needed
import TamuKamarInput from "./components/tamuKamarInput"; // Adjust path as needed

export default function Home() {
  const router = useRouter(); // Initialize router
  const [search, setSearch] = useState({
    destinasi: "",
    tanggal: "",
    tamuKamar: { tamu: 2, kamar: 1 }, // Initialize with default values
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    // Validate search parameters if needed
    if (!search.destinasi) {
      setError("Silakan pilih destinasi terlebih dahulu");
      return;
    }
    if (!search.tanggal) {
      setError("Silakan pilih tanggal menginap");
      return;
    }

    // Clear any previous errors
    setError(null);

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

  return (
    <div
      style={{ backgroundImage: "url('/lobby_background.jpg')" }}
      className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center px-20 sm:px-32"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <main className="relative flex flex-col items-center gap-6 text-center text-white">
        {/* Main Text */}
        <h2 className="text-lg sm:text-4xl font-semibold">
          Staycation menjadi lebih mudah hanya dengan satu klik dan dapatkan
          banyak promo menarik!
        </h2>

        {/* Search Bar */}
        <div className="flex w-full bg-white p-5 rounded-xl items-end gap-10">
          {/* Input Grid */}
          <div className="relative w-full grid grid-cols-3 gap-10">
            {/* Input destinasi */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-black text-xs font-normal">
                Pilih Kota/Nama Hotel/ Destinasi
              </p>
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
            </div>

            {/* Input Tanggal */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-black text-xs font-normal">Tanggal Menginap</p>
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
            </div>

            {/* Input Tamu dan Kamar with inline inputs */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-black text-xs font-normal">
                Jumlah Tamu dan Kamar
              </p>
              <TamuKamarInput
                value={search.tamuKamar}
                onChange={(e) =>
                  setSearch((prev) => ({
                    ...prev,
                    tamuKamar: e.target.value, // Update based on your TamuKamarInput component
                  }))
                }
              />
            </div>
          </div>

          {/* Button Search */}
          <button
            onClick={handleSearch}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-[15px] px-[25px] h-[44px] rounded-2xl transition whitespace-nowrap"
          >
            Cari Hotel
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 text-red-500 bg-red-100 p-2 rounded-lg">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
