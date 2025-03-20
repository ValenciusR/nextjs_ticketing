"use client";

import PencarianBar from "./pencarianBar";
import Filter from "./filter";
import ListHotel from "./listHotel";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchSlug() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState([]);
  console.log("🚀 ~ SearchSlug ~ hotels:", hotels);

  const paramsObject = Object.fromEntries(searchParams.entries());
  console.log("🚀 ~ SearchSlug ~ paramsObject:", paramsObject);

  const cityId = paramsObject.destinasi;
  const date = paramsObject.tanggal;
  const roomsCount = paramsObject.kamar;
  const adultGuests = paramsObject.tamu;
  const page = 1;

  useEffect(() => {
    // Define the async function to fetch hotels
    async function fetchHotels() {
      try {
        // setLoading(true);
        const response = await fetch(
          `/api/hotels?city_id=${cityId}&date=${date}&rooms_count=${roomsCount}&adult_guests=${adultGuests}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHotels(data);
        // setError(null);
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
        // setError("Failed to load hotels. Please try again later.");
        setHotels([]);
      } finally {
        // setLoading(false);
      }
    }

    // Call the function
    fetchHotels();

    // Dependency array - the effect will re-run if any of these values change
  }, [cityId, date, roomsCount, adultGuests, page]);

  return (
    <main className="relative h-screen flex flex-col py-8 px-32">
      {/* Pencarian Bar */}
      <PencarianBar />
      {/* body */}
      <div className="relative flex flex-row mt-8 justify-between gap-10">
        <Filter />
        <ListHotel hotels={hotels} />
      </div>
    </main>
  );
}
