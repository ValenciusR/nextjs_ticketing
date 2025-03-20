"use client";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="px-32 mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">STAYKUY</div>

        {/* Navbar end */}
        <div className="flex items-center gap-12 text-white text-sm">
          {/* Link Page */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">
              My Booking
            </a>
            <a href="#" className="hover:underline">
              Wishlist
            </a>
            <a href="#" className="hover:underline">
              Blog
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
          </div>
          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full text-sm font-medium">
              T
            </div>
            {/* Language */}
            <span className="text-white text-sm">ID</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
