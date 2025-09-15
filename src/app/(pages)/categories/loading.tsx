"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="basic-sec backdrop-blur-sm bg-white/45 flex justify-center items-center h-screen w-screen">
      <span className="loader"></span>
    </div>
  );
}
