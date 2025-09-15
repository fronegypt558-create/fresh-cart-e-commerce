import AllCategories from '@/app/_components/allCategory/page';
import React from 'react'

export default function Categories() {
  return (
    <div className="basic-sec">
      <div className="basic-container">
        <h1 className="text-4xl font-bold mb-6 mx-auto w-fit">Categories</h1>
        <AllCategories/>
      </div>
    </div>
  );
}
