import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24 lg:py-32 bg-gradient-to-r from-purple-400 via-purple-900 to-purple-900 text-white">
      <div className="flex flex-row lg:w-1/2">
        <Image
          src="/Image1.png"
          alt="Art Image 1"
          width={500}
          height={500}
          className="w-full h-96 ps-16 pr-2 rounded-2xl"
        />
        <Image
          src="/Image2.png"
          alt="Art Image 2"
          width={500}
          height={500}
          className="w-full h-96 pe-14 pl-2 rounded-2xl"
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
        <div className="flex justify-center mt-10">
          <Link href="/dashboard/index">
            <Button className="bg-purple-200">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
    
  );
}
