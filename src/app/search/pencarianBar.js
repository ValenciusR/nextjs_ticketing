"use client";

export default function PencarianBar() {
  return (
    <div className="flex flex-row justify-between items-center p-5 bg-white rounded-xl shadow-lg">
      {/* Search Input */}
      <div className="flex flex-row items-center gap-5">
        {/* Destinasi */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">
            Pilih Kota/Nama Hotel/ Destinasi
          </p>

          <p className="text-black text-base font-semibold">Jakarta</p>

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

        {/* Tanggal Menginap */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">Tanggal Menginap</p>

          <p className="text-black text-base font-semibold">
            12 Maret - 14 Maret 2025
          </p>

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

        {/* Tamu Kamar */}
        <div className="flex flex-col">
          <p className="text-black text-xs font-normal">
            Jumlah Tamu dan Kamar
          </p>

          <p className="text-black text-base font-semibold">2 Tamu 2 Kamar</p>

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
      <button className="bg-blue-600 hover:bg-blue-700 text-white  text-xs font-medium py-[15px] px-[25px] h-[44px] rounded-2xl transition whitespace-nowrap">
        Ubah Pencarian
      </button>
    </div>
  );
}
