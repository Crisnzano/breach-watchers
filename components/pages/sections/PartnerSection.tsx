import React from "react";

export default function PartnersSection() {
  const partners = [
    {logo: "/assets/base.png", alt: "SupaBase" },
    {logo: "/assets/optimism.png",alt: "Vercel" },
    {logo: "/assets/safaridao.png", alt: "Laravel" },
  ];

  return (
    <section className="py-16 bg-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t-2 border-gray-600 mb-6"></div>

        <div className="flex justify-center items-center space-x-28">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24">
              <img
                src={partner.logo}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-600 mt-6"></div>
      </div>
    </section>
  );
}
