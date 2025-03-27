import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroImage from "../../assets/hero.png"; // Importing image correctly

export default function ImageCarousal() {
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left Section - Text Content */}
        <div className="flex flex-col justify-center items-start text-left gap-6 md:w-1/2 min-w-[50%]">
          <h1 className="text-4xl font-bold text-gray-900">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <p className="text-lg text-gray-600">
            Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
          </p>
          <Button className="button w-full sm:w-fit text-lg py-3 px-6">
            <Link to="/events">Explore Now</Link>
          </Button>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center md:w-1/2">
          <img 
            src={HeroImage} 
            alt="hero" 
            className="w-full max-w-lg h-auto object-contain rounded-lg shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
