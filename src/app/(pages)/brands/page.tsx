"use client";

import React, { useEffect, useState } from "react";
import getAllBrands from "@/Api/allBrands/getAllBrands.api";
import Image from "next/image";
import { IBrand } from "@/app/_interfaces/brands.interface";
import Link from "next/link";

export default function Brands() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await getAllBrands();
        setBrands(res);
      } catch (err) {
        console.error("Error fetching brands", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="basic-sec backdrop-blur-sm bg-white/45 flex justify-center items-center h-screen w-screen">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="basic-sec bg-gradient-to-b from-green-50 to-white min-h-screen py-10">
      <div className="basic-container max-w-7xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
          Our Brands
        </h1>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Brands Grid */}
        {filteredBrands.length === 0 ? (
          <p className="text-center text-gray-500">No brands found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg border border-green-100"
              >
                <Link href={`/brands/${brand._id}`} className="w-full h-full">
                  <div className="w-24 h-24 relative mb-3">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-green-700">
                    {brand.name}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
