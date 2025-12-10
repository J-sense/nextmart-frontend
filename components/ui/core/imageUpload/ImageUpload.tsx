/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "../../input";
import Image from "next/image";

export default function ImageUpload({ imageFile, setImageFile }:any) {

  console.log(imageFile);
  const [imagePreview, setImagePreview] = React.useState<string[]>([]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files![0];
    setImageFile((prev:any) => [...prev, files]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(files);
    event.target.value = "";
  };
  const handleRemoveImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setImageFile((prev:any) => prev.filter((_:any, i:any) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Upload Input */}
      {imagePreview.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-4 mt-3">
            {imagePreview.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition"
              >
                <Image
                  src={img}
                  alt="previewImage"
                  width={40}
                  height={40}
                  className="object-cover w-[140px] h-[140px]"
                />

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white text-red-600 border border-red-500
                     rounded-full w-7 h-7 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Input
            type="file"
            accept="image/*"
            multiple
            id="id"
            onChange={handleImageUpload}
            className="cursor-pointer border-gray-300 rounded-lg hover:border-gray-400 transition hidden"
          />

          <label htmlFor="id" className="font-semibold text-sm text-gray-700">
            Upload Logo
          </label>
        </>
      )}
    </div>
  );
}
