import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export default function CarouselDemo() {
  // Array of image objects with corresponding text and image paths
  const images = [
    { id: 1, text: "Annual data protection audits", src: "/Image3.png" },
    { id: 2, text: "Privacy policy reviews", src: "/Image4.png" },
    { id: 3, text: "Data breach notification deadlines", src: "/Image5.png" },
  ];

  return (
    <div className="flex justify-center bg-purple-900 py-10"> {/* Center the carousel and apply background color */}
      <Carousel className="w-max max-w-5xl"> {/* Adjust the carousel width to fit the screen */}
        <CarouselContent className="flex gap-4 justify-between"> {/* Add gap between items */}
          {images.map((image) => (
            <CarouselItem key={image.id} className="w-1/3 px-2"> {/* Adjust the width to fit 3 images */}
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  {/* Image from the public folder */}
                  <img
                    src={image.src}
                    alt={image.text}
                    className="object-cover w-full h-full"
                  />
                  {/* Text description below the image */}
                  <span className="mt-4 text-center text-xl text-white">
                    {image.text}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"/>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"/>
      </Carousel>
    </div>
  );
}
