"use client";

import PencarianBar from "@/app/search/pencarianBar";
import Image from "next/image";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { useSearchParams } from "next/navigation";

export default function HotelSlug() {
  const aboutRef = useRef(null);
  const fasilitasRef = useRef(null);
  const kamarRef = useRef(null);
  const reviewRef = useRef(null);
  const lokasiRef = useRef(null);
  const kebijakanRef = useRef(null);

  const searchParams = useSearchParams();
  const hotelData = JSON.parse(decodeURIComponent(searchParams.get("data")));
  console.log("🚀 ~ HotelSlug ~ hotelData:", hotelData);

  const scroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative h-screen flex flex-col py-8 px-32">
      {/* Pencarian Bar */}
      <PencarianBar />

      {/* body */}
      <div className="flex flex-col w-full mt-10 gap-10">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-2xl font-semibold">{hotelData.name}</p>
            <div className="flex flex-row gap-2">
              {Array.from({ length: hotelData.star }, (_, index) => (
                <span key={index} className="text-yellow-500 text-xl">
                  <FaStar />
                </span>
              ))}
            </div>
          </div>
          {/* Location */}
          <div className="flex flex-row items-center gap-2">
            <span className="text-red-500 text-xl">
              <IoLocationSharp />
            </span>
            <p className="text-xs font-normal text-gray-700">
              {hotelData.address},{hotelData.city.name},{hotelData.city.country}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="grid grid-cols-3 justify-items-center items-center gap-8">
          <Image
            src={hotelData.images?.[0]}
            alt="placeholder"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg col-span-2 w-full object-cover"
          />
          <div className="flex flex-col h-full gap-8">
            <Image
              src={hotelData.images?.[1]}
              alt="placeholder"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-lg w-full h-full object-cover"
            />
            <Image
              src={hotelData.images?.[2]}
              alt="placeholder"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Tab */}
        <div className="flex space-x-4 border-b pb-2 sticky top-0 bg-white z-10">
          <button
            onClick={() => scroll(aboutRef)}
            className="p-2 hover:text-blue-600"
          >
            Tentang Hotel
          </button>
          <button
            onClick={() => scroll(fasilitasRef)}
            className="p-2 hover:text-blue-600"
          >
            Fasilitas
          </button>
          <button
            onClick={() => scroll(kamarRef)}
            className="p-2 hover:text-blue-600"
          >
            Kamar
          </button>
          <button
            onClick={() => scroll(reviewRef)}
            className="p-2 hover:text-blue-600"
          >
            Review
          </button>
          <button
            onClick={() => scroll(lokasiRef)}
            className="p-2 hover:text-blue-600"
          >
            Lokasi
          </button>
          <button
            onClick={() => scroll(kebijakanRef)}
            className="p-2 hover:text-blue-600"
          >
            Kebijakan Hotel
          </button>
        </div>

        {/* About */}
        <div ref={aboutRef} className="text-[14px] font-normal text-gray-700">
          {hotelData.description}
        </div>

        {/* Fasilitas */}
        <div ref={fasilitasRef} className="flex flex-col gap-6">
          <p className="text-[16px] font-semibold">Fasilitas Hotel</p>
          <div className="grid grid-cols-5 justify-items-center items-center">
            {hotelData.facilities?.map((facility, index) => (
              <div
                key={index}
                className="flex flex-row w-full justify-center items-center text-gray-600"
              >
                <p className="text-[14px] font-normal">{facility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kamar */}
        <div ref={kamarRef} className="flex flex-col gap-10">
          <p className="text-[16px] font-semibold">Tipe dan Harga Kamar</p>

          {hotelData.rooms.map((room) => (
            <div key={room.id} className="flex flex-row gap-6">
              {/* Photo + Title */}
              <div className="flex flex-row w-md h-fit bg-white rounded-xl shadow-lg">
                <div className="flex flex-col w-full">
                  <Image
                    src={room.images?.[0]}
                    alt="placeholder"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg col-span-2 w-full object-cover"
                  />
                  <div className="flex flex-row justify-between p-4 w-full">
                    <p className="">{room.name}</p>
                    <p className="flex flex-row">
                      {room.size}m{" "}
                      <span className="text-[8px] font-medium">2</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail Harga */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row w-full h-fit bg-white rounded-xl shadow-lg p-4">
                  <div className="flex flex-col w-full gap-4">
                    <p className="text-[16px] font-semibold">
                      {room.name}, {room.bed_type}
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <button className="bg-blue-300 text-white text-[10px] font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                        Bisa refund
                      </button>
                      <button className="bg-blue-300 text-white text-[10px] font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                        Bisa reschedule
                      </button>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="flex flex-row items-center gap-2">
                          <FaRegUser className="text-black text-lg" />
                          <p className="text-[14px] font-normal text-gray-600">
                            {room.guest_capacity} Tamu
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <FaRegUser className="text-black text-lg" />
                          <p className="text-[14px] font-normal text-gray-600">
                            {room.is_breakfast_included
                              ? "Termasuk Sarapan"
                              : "Tidak Termasuk Sarapan"}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <LuBedDouble className="text-black text-lg" />
                          <p className="text-[14px] font-normal text-gray-600">
                            {room.bed_type}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <FaRegUser className="text-black text-lg" />
                          <p className="text-[14px] font-normal text-gray-600">
                            Wi-fi gratis
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-end line-through text-[16px] text-gray-400">
                          IDR{" "}
                          {new Intl.NumberFormat("id-ID").format(
                            room.price + room.price / 10
                          )}
                        </div>
                        <div className="text-end flex flex-row justify-end items-center">
                          <p className="text-xl font-semibold text-blue-600">
                            IDR{" "}
                            {new Intl.NumberFormat("id-ID").format(room.price)}
                          </p>
                          <p className="text-[14px] font-normal text-gray-700">
                            /malam
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="w-fit bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-bold py-[15px] px-[25px] rounded-2xl transition whitespace-nowrap">
                        Pilih Kamar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* revew */}
        <div ref={reviewRef} className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold">Review Kamar</p>
          <p className="text-[14px] ">Belum ada review untuk hotel ini</p>
        </div>

        {/* location */}
        <div ref={lokasiRef} className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold">Location</p>
          <p className="text-[14px] ">Lokasi Belum Tersedia</p>
        </div>

        {/* policy */}
        <div ref={kebijakanRef} className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold">Kebijakan Hotel</p>
          <p className="text-[14px] ">{hotelData.policy}l</p>
        </div>
      </div>
    </main>
  );
}
