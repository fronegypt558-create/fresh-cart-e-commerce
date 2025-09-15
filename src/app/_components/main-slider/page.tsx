"use client";

import React from "react";
import Img1 from "../../../../public/images/slider-image-1.jpeg";
import Img2 from "../../../../public/images/slider-image-2.jpeg";
import Img3 from "../../../../public/images/slider-image-3.jpeg";
import Img4 from "../../../../public/images/grocery-banner-2.jpeg";
import Img5 from "../../../../public/images/grocery-banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";

export default function MainSLider() {
  return (
    <div className="w-full border-2 overflow-hidden border-green-700 rounded-lg bg-green-50">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <Image
            src={Img1}
            alt="image"
            className="h-[400px] w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img2}
            alt="image"
            className="h-[400px] w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img3}
            alt="image"
            className="h-[400px] w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img4}
            alt="image"
            className="h-[400px] w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img5}
            alt="image"
            className="h-[400px] w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
