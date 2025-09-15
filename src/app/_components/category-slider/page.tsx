"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Icategory } from "@/app/_interfaces/category.interface";
import Link from "next/link";

export default function CategorySlider({ data }: { data: Icategory[] }) {
  return (
    <div className="w-full border-2 overflow-hidden border-green-700 rounded-lg backdrop-blur-sm bg-white/30 p-4 mt-5">
      <h2 className="text-2xl font-extralight mb-5">
        Show Popular Category ...
      </h2>
      <Swiper
        spaceBetween={20}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 }, // موبايل صغير
          480: { slidesPerView: 2 }, // موبايل كبير
          768: { slidesPerView: 3 }, // تابلت
          1024: { slidesPerView: 4 }, // لابتوب
          1280: { slidesPerView: 6 }, // شاشات كبيرة
        }}
      >
        {data.map((category: Icategory) => (
          <SwiperSlide key={category._id}>
            <Link href={`/categories/${category._id}`}>
              <div className="relative h-[200px] w-full">
                <Image
                  fill
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <p className="text-center mt-2 font-medium">{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
