"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";

export default function Filter() {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedFasilitas, setSelectedFasilitas] = useState([]);
  const [harga, setHarga] = useState([0, 999999999]);

  const ratings = [1, 2, 3, 4, 5];
  const fasilitas = [
    "Kolam Renang",
    "Parkir Gratis",
    "Pusat Kebugaran",
    "SPA",
    "Mesin Cuci",
  ];

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleFasilitasChange = (fasilitas) => {
    setSelectedFasilitas((prev) =>
      prev.includes(fasilitas)
        ? prev.filter((item) => item !== fasilitas)
        : [...prev, fasilitas]
    );
  };

  const handleHargaChange = (event, newValue) => {
    setHarga(newValue);
  };

  return (
    <div className="flex flex-col justify-items-start p-5 bg-white rounded-xl shadow-lg gap-4 w-lg h-fit">
      <p className="text-base text-black font-semibold">Filter Pencarian</p>

      {/* Bintang Hotel */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">Bintang Hotel</p>
        {/* Star Check Filter */}
        <div className="flex flex-col space-y-2 bg-white ">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="w-5 h-5 accent-blue-500"
              />
              <div className="flex gap-2">
                {Array.from({ length: rating }).map((_, index) => (
                  <span key={index} className="text-yellow-500 text-xl">
                    <FaStar />
                  </span>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-300"></div>

      {/* Fasilitas */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">Fasilitas</p>
        {/* Fasilitas Filter */}
        <div className="flex flex-col space-y-2 bg-white ">
          {fasilitas.map((fasilitas, index) => (
            <label
              key={fasilitas}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={fasilitas}
                  checked={selectedFasilitas.includes(fasilitas)}
                  onChange={() => handleFasilitasChange(fasilitas)}
                  className="w-5 h-5"
                />
                <label htmlFor={fasilitas} className="text-gray-700">
                  {fasilitas}
                </label>
              </div>
            </label>
          ))}
        </div>
        <a className="underline text-blue-500 text-xs">
          + Tampilkan lebih banyak
        </a>
      </div>

      <div className="border-b border-gray-300"></div>

      {/* Scroll Harga */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">Harga</p>
        {/* Harga Slider */}
        <div className="flex flex-col space-y-2 bg-white ">
          <Slider
            value={harga}
            onChange={handleHargaChange}
            min={0}
            max={999999999}
            step={1000000}
            valueLabelDisplay="off"
            sx={{ color: "#007ADE" }}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>IDR {harga[0].toLocaleString()}</span>
            <span>IDR {harga[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
