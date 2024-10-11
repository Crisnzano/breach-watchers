import React from "react";
import Image from 'next/image';
import Image1 from '@/components/public/Image1.png';
import Image2 from '@/components/public/Image2.png';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24 lg:py-32 bg-gradient-to-r from-purple-400 via-purple-900 to-purple-900 text-white">
      <div className="flex flex-row lg:w-1/2">
        <Image
          src={Image1}
          alt="Art Image 1"
          width={500}
          height={500}
          className="w-full h-96 ps-16 pr-2"
        />
        <Image
          src={Image2}
          alt="Art Image 2"
          width={500}
          height={500}
          className="w-full h-96 pe-14 pl-2"
        />
      </div>
      <div className="flex flex-col items-start lg:w-1/2 space-y-6 mt-8 lg:mt-0 lg:ml-12">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
          BreachWatchers
          <br />
          Your Compliance Guardian
        </h1>
        <p className="text-lg lg:text-xl text-gray-300">
          Delivering immediate value through rule-based compliance checks, privacy policy auditing, and compliance reminders.
        </p>
      </div>
    </section>
  );
}
