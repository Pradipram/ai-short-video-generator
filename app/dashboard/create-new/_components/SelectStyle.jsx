"use client";
import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = ({ onUserSelect }) => {
  const [selectedOption, setSelectedOption] = useState();

  const styleOption = [
    {
      name: "Realistic",
      image: "/real.jpg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "comic",
      image: "/comic.jpeg",
    },
    {
      name: "watercolor",
      image: "/watercolor.jpeg",
    },
    {
      name: "gta",
      image: "/gta.jpeg",
    },
  ];
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {styleOption.map((option, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer ${
              selectedOption === option.name &&
              "border-4 border-primary rounded-xl"
            }`}
            onClick={() => {
              setSelectedOption(option.name);
              onUserSelect("style", option.name);
            }}
          >
            <Image
              src={option.image}
              width={100}
              height={100}
              alt={option.name}
              className="h-48 object-cover rounded-lg w-full"
            />
            <h2
              className="absolute p-1 bg-black bottom-0 w-full text-white
            text-center rounded-md"
            >
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
