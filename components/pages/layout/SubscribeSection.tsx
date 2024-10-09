import React from "react";

export default function SubscribeSection() {
  return (
    <section className="py-24 bg-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center lg:justify-start">
          <img
            src="/assets/subscribe.png"
            alt="Art"
            className="w-96 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Subscribe Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
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
      </div>
    </section>
  );
}
