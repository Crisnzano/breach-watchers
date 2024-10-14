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
    { id: 1, text: "Annual Data Protection Audits", src: "/Image3.png" },
    { id: 2, text: "Privacy Policy Reviews", src: "/Image4.png" },
    { id: 3, text: "Data Breach Notification Deadlines", src: "/Image5.png" },
  ];

  return (
    <div className="flex justify-center bg-gradient-to-r from-purple-800 to-purple-900 py-16"> {/* Center the carousel and apply gradient background */} 
      <Carousel className="w-full max-w-7xl"> {/* Increase the carousel width */} 
        <CarouselContent className="flex gap-8 justify-center"> {/* Increase gap between items */} 
          {images.map((image) => (
            <CarouselItem key={image.id} className="w-1/3"> {/* Adjust the width to fit 3 images */} 
              <Card className="overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"> {/* Add hover effects and transitions */} 
                <CardContent className="flex flex-col items-center justify-center p-6"> {/* Increased padding for better spacing */} 
                  {/* Image from the public folder */}
                  <img
                    src={image.src}
                    alt={image.text}
                    className="object-cover w-full h-72 rounded-lg" 
                  />
                  {/* Text description below the image */}
                  <span className="mt-6 text-center text-2xl text-white font-semibold"> {/* Increased font size and weight */}
                    {image.text}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white text-purple-800 rounded-full p-3 shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"/> {/* Styled carousel previous button */}
        <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white text-purple-800 rounded-full p-3 shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"/> {/* Styled carousel next button */}
      </Carousel>
    </div>
  );
}
