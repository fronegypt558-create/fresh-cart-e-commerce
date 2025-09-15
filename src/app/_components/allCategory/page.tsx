import React from "react";
import CategorySlider from "../category-slider/page";
import getAllCategories from "@/Api/allCategories/getAllCategories.api";

export default async function AllCategories() {
  const data = await getAllCategories();

  return (
    <div>
      <CategorySlider data={data} />
    </div>
  );
}
