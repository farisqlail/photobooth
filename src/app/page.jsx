'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import anime from 'animejs';

export default function Home() {
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden font-sans px-4 md:px-12 py-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold flex items-center gap-2">
          <span>Vita Booth</span>
        </div>

        <div className="flex gap-4 items-center">
          <button className="border px-4 py-1 rounded-full text-sm hover:bg-white hover:text-black transition">
            Contact
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 h-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            WE'RE A <span className="text-white">PHOTOBOOTH</span> SPACE <br />
            THAT CAPTURES MEMORIES
          </h1>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
            <button
              onClick={() => handleNavigation("/photobooth")}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
            >
              Start Capture
            </button>
            <button className="border border-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
              Explore
            </button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <Image
            src="/assets/illustration/booth.png"
            alt="booth"
            width={90}
            height={90}
            className="absolute left-2 md:left-10 top-[10%] animate-float"
          />
          <Image
            src="/assets/illustration/polaroid.png"
            alt="polaroid"
            width={90}
            height={90}
            className="absolute right-4 top-[5%] animate-float-slow"
          />
          <Image
            src="/assets/illustration/accesories.png"
            alt="accesories"
            width={90}
            height={90}
            className="absolute bottom-4 right-6 animate-float-fast"
          />
          <Image
            src="/assets/illustration/camera.png"
            alt="camera"
            width={180}
            height={180}
            className="z-10 opacity-90"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 md:absolute md:bottom-6 md:right-10 max-w-md text-sm text-gray-300 text-center md:text-right">
        A playful photobooth experience for events, brands, and creators.
        Designed with soul to help you capture, share, and relive the joy. By Laildev
      </div>
    </div>
  );
}
