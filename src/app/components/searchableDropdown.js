"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchableDropdown({
  name,
  value,
  onChange,
  placeholder,
  options,
  loading,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
  }, []);

  // Handle selecting an option
  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onChange({ target: { name, value: e.target.value } });
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-xs text-black focus:outline-none focus:border-blue-500"
      />

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="p-2 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-2 text-center text-red-500">
              Error loading options
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
