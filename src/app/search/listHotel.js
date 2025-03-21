"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { PiBarbell } from "react-icons/pi";
import { GrSpa } from "react-icons/gr";
import { useRouter } from "next/navigation";

export default function ListHotel({ hotels, paramsObject }) {
  const router = useRouter();

  const handleClick = (hotel) => {
    const queryParams = new URLSearchParams({
      data: JSON.stringify(hotel),
      ...paramsObject,
    }).toString();

    router.push(`/hotel/${encodeURIComponent(hotel.name)}?${queryParams}`);
  };

  const getCheapestRoom = (rooms) => {
    if (!rooms || rooms.length === 0) return null;
    return rooms.reduce((cheapest, room) =>
      room.price < cheapest.price ? room : cheapest
    );
  };
  console.log("🚀 ~ ListHotel ~ hotels:", hotels.data);
  return (
    <div className="flex flex-col p-5 bg-white  w-full gap-10">
      {/* Title */}
      <div className="flex flex-row gap-4 items-center">
        <p className="text-xl font-semibold">Hasil Pencarian</p>
        <p className="text-xs font-medium">
          {hotels === undefined ? "0" : `${hotels?.data?.data?.length || 0}`}{" "}
          Hotel Ditemukan
        </p>
      </div>

      {/* List Hotel Item */}
      <div className="flex flex-col gap-5">
        {hotels &&
          (hotels.data?.total > 0 ? (
            hotels.data.data.map((hotel) => {
              const cheapestRoom = getCheapestRoom(hotel.rooms);
              return (
                <div
                  key={hotel.id}
                  className="flex flex-row justify-items-start bg-white rounded-xl shadow-lg w-full h-fit cursor-pointer"
                  onClick={() => handleClick(hotel)}
                >
                  <div className="relative w-[252px] h-fill">
                    <Image
                      src={hotel.images?.[0]}
                      alt="placeholder"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full py-2 px-4 h-fit">
                    {/* Item Title */}
                    <p className="text-base font-semibold">{hotel.name}</p>

                    {/* Item Star */}
                    <div className="flex flex-row gap-1">
                      {Array.from({ length: hotel.star }, (_, index) => (
                        <span key={index} className="text-yellow-500 text-xl">
                          <FaStar />
                        </span>
                      ))}
                    </div>

                    {/* Item Location */}
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-red-500 text-xl">
                        <IoLocationSharp />
                      </span>
                      <p className="text-xs font-normal text-gray-700">
                        {hotel.address},{hotel.city.name},{hotel.city.country}
                      </p>
                    </div>

                    {/* Item Fasilitas */}
                    <div className="flex flex-row items-center gap-2">
                      {hotel.facilities.includes("Laundry") && (
                        <span className="text-gray text-xl">
                          <MdOutlineLocalLaundryService />
                        </span>
                      )}
                      {hotel.facilities.includes(
                        "Outdoor Swimming Pool" || "Swimming Pool"
                      ) && (
                        <span className="text-gray text-xl">
                          <MdOutlinePool />
                        </span>
                      )}
                      {hotel.facilities.includes("Concierge Service") && (
                        <span className="text-gray text-xl">
                          <MdOutlineSupportAgent />
                        </span>
                      )}
                      {hotel.facilities.includes("Fitness Center") && (
                        <span className="text-gray text-xl">
                          <PiBarbell />
                        </span>
                      )}
                      {hotel.facilities.includes("Spa") && (
                        <span className="text-gray text-xl">
                          <GrSpa />
                        </span>
                      )}
                    </div>

                    {/* Refundable dan Scheduleable */}
                    <div className="flex flex-row items-center gap-2">
                      <button className="bg-blue-300 text-white text-[8px] font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                        Bisa refund
                      </button>
                      <button className="bg-blue-300 text-white text-[8px] font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                        Bisa reschedule
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-end flex flex-row justify-end items-center">
                      <p className="text-xl font-semibold text-blue-600">
                        IDR {cheapestRoom.price.toLocaleString()}
                      </p>
                      <p className="text-[14px] font-normal text-gray-700">
                        /malam
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada hotel ditemukan.
            </p>
          ))}
      </div>
    </div>
  );
}
