"use client";

import PencarianBar from "./pencarianBar";
import Filter from "./filter";
import ListHotel from "./listHotel";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchSlug() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const paramsObject = Object.fromEntries(searchParams.entries());
  console.log("🚀 ~ SearchSlug ~ paramsObject:", paramsObject);

  const cityId = paramsObject.destinasi;
  const date = paramsObject.tanggal;
  const roomsCount = paramsObject.kamar;
  const adultGuests = paramsObject.tamu;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      router.push(
        `/hotel/search?destinasi=${cityId}&tanggal=${date}&kamar=${roomsCount}&tamu=${adultGuests}&page=${newPage}`
      );
    }
  };

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch(
          `/api/hotels?city_id=${cityId}&date=${date}&rooms_count=${roomsCount}&adult_guests=${adultGuests}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚀 ~ fetchHotels ~ data:", data.data.total_pages);
        setHotels(data);
        setTotalPages(data.data.total_pages);
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
        setHotels([]);
      } finally {
      }
    }

    fetchHotels();
  }, [cityId, date, roomsCount, adultGuests, page]);

  return (
    <main className="relative h-screen flex flex-col py-8 px-32">
      {/* Pencarian Bar */}
      <PencarianBar searchParam={paramsObject} />
      {/* body */}
      <div className="relative flex flex-row mt-8 justify-between gap-10">
        <Filter />
        <div className=" flex flex-col w-full">
          <ListHotel hotels={hotels} paramsObject={paramsObject} />
          <div className="flex justify-center mt-5 gap-3">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`px-4 py-2 rounded ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Prev
            </button>
            <span className="px-4 py-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded ${
                page >= totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
