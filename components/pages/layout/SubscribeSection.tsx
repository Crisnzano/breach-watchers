import React from "react";
import Image from 'next/image';
import Image6 from '@/components/public/Image6.png';
import Image7 from '@/components/public/Image7.png';
import Image8 from '@/components/public/Image8.png';

export default function SubscribeSection() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24 lg:py-32 bg-purple-900 text-white">
      {/* Image Section with overlapping images */}
      <div className="relative flex justify-center lg:w-1/2">
        <div className="relative w-max">
          {/* Main Image */}
          <Image
            src={Image6}
            alt="Main Art"
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          
          {/* Overlayed Image 1 */}
          <Image
            src={Image7}
            alt="Overlayed Art 1"
            width={250}
            height={250}
            className="absolute top-2 left-10 w-64 h-auto object-cover rounded-lg shadow-md z-10"
          />
          
          {/* Overlayed Image 2 */}
          <Image
            src={Image8}
            alt="Overlayed Art 2"
            width={250}
            height={250}
            className="absolute top-4 left-40 w-64 h-auto object-cover rounded-lg shadow-md z-20"
          />
        </div>
      </div>

      {/* Subscribe Form Section */}
      <div className="flex flex-col items-start lg:w-1/2 space-y-6 mt-8 lg:mt-0 lg:ml-12">
        <h2 className="text-4xl font-extrabold leading-tight">
          Subscribe to get fresh news and updates about Privacy Policies and Data Compliance
        </h2>
        <div className="flex max-w-lg">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-grow px-4 py-3 rounded-l-lg border-none outline-none bg-white text-black"
          />
          <button className="px-6 py-3 rounded-r-lg bg-purple-600 text-white hover:bg-purple-700">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
