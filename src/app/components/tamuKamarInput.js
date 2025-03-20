"use client";

import { useState, useRef, useEffect } from "react";

export default function TamuKamarInput({ value, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localValue, setLocalValue] = useState({
    tamu: value?.tamu || 2,
    kamar: value?.kamar || 1,
  });
  const containerRef = useRef(null);

  // Close expanded inputs when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format display value
  const displayValue = `${localValue.tamu} Tamu, ${localValue.kamar} Kamar`;

  // Handle input changes
  const handleInputChange = (type, e) => {
    const numValue = Math.max(1, parseInt(e.target.value) || 1);

    const updatedValue = {
      ...localValue,
      [type]: numValue,
    };

    setLocalValue(updatedValue);
    onChange({
      target: {
        name: "tamuKamar",
        value: updatedValue,
      },
    });
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {!isExpanded ? (
        <input
          type="text"
          name="tamuKamar"
          readOnly
          placeholder="Masukan jumlah tamu dan kamar"
          value={displayValue}
          onClick={() => setIsExpanded(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-xs text-black focus:outline-none focus:border-blue-500 cursor-pointer"
        />
      ) : (
        <div className="w-full flex gap-2 items-center">
          <div className="flex-1 flex items-center">
            <input
              type="number"
              min="1"
              value={localValue.tamu}
              onChange={(e) => handleInputChange("tamu", e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-xs text-black focus:outline-none focus:border-blue-500"
            />
            <label className="ml-2 text-xs text-gray-500">Tamu</label>
          </div>
          <div className="flex-1 flex items-center">
            <input
              type="number"
              min="1"
              value={localValue.kamar}
              onChange={(e) => handleInputChange("kamar", e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-xs text-black focus:outline-none focus:border-blue-500"
            />
            <label className="ml-2 text-xs text-gray-500">Kamar</label>
          </div>
        </div>
      )}
    </div>
  );
}
