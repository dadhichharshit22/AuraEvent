import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://images.pexels.com/photos/2952834/pexels-photo-2952834.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Description 1",
    },
    {
      src: "https://images.pexels.com/photos/30299804/pexels-photo-30299804/free-photo-of-dramatic-forest-silhouette-at-vibrant-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Description 2",
    },
    {
      src: "https://images.pexels.com/photos/28539583/pexels-photo-28539583/free-photo-of-majestic-mountain-peaks-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Description 3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen max-w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={`flex items-center justify-center h-full ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <CarouselPrevious className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            &lt; {/* You can replace this with an icon */}
          </CarouselPrevious>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <CarouselNext className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            &gt; {/* You can replace this with an icon */}
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
