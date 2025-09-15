"use client";

import React from "react";
import { ProductType } from "./../../_interfaces/product.interface";
import Link from "next/link";
import Image from "next/image";
import AddBtnCart from "../buttons/AddBtnCart/page";
import AddBtnWishlist from "../buttons/AddBtnWishlist/page";

export default function ProductItem(props: { data: ProductType; key: string }) {
  return (
    <div
      className="flex flex-col relative group bg-green-50 p-3 rounded-xl border-2 border-green-100"
      key={props.key}
    >
      <Link
        href={`/products/${props.data.id}`}
        className="flex flex-col h-full"
      >
        {/* Image */}
        <div className="w-full rounded-md overflow-hidden mb-4">
          <Image
            width={300}
            height={300}
            className="w-full"
            src={props.data.imageCover}
            alt={props.data.title}
          />
        </div>
        {/* Content */}
        <div className="flex flex-col grow">
          <h4 className="text-lg text-green-700">{props.data.category.name}</h4>
          <h3 className="text-xl text-gray-950 font-semibold my-3">
            {props.data.title}
          </h3>
          <div className="flex grow items-end justify-between mt-2">
            <span className="text-lg font-bold text-green-600">
              {props.data.price}EGP
            </span>
            <div className="flex items-center gap-1">
              <span className="font-bold">{props.data.ratingsAverage}</span>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
          </div>
        </div>
      </Link>
      {/* Add Icon */}
      <AddBtnCart id={props.data._id} />
      <AddBtnWishlist id={props.data._id} />
    </div>
  );
}
