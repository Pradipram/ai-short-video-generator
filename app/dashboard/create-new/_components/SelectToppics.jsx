"use client";
import { Textarea } from "../../../../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useState } from "react";

const SelectToppics = ({ onUserSelect }) => {
  const [selectedOptoin, setSelectedOption] = useState(null);

  const options = [
    "Custom Prompt",
    "Random Ai Story",
    "Scary Story",
    "Love Story",
    "Funny Story",
    "Sad Story",
    "Action Story",
    "Adventure Story",
    "Mystery Story",
    "Fantasy Story",
    "Romantic Story",
    "Sci-Fi Story",
    "Historical Story",
    "Drama Story",
    "Thriller Story",
    "Horror Story",
    "Comedy Story",
    "Crime Story",
    "Documentary Story",
    "Biography Story",
    "Educational Story",
    "Inspirational Story",
    "Motivational Story",
  ];
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-gray-500">What is the toppic of your video</p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "Custom Prompt" && onUserSelect("toppic", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOptoin == "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={(e) => onUserSelect("topic", e.target.value)}
          placeholder="Write prompt on which you want to generate video"
        />
      )}
    </div>
  );
};

export default SelectToppics;
