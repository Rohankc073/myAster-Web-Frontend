import React, { useEffect, useState } from "react";



const Carousel = () => {
  // ✅ Slides with Images (for public/images/ folder)
  const slides = [
    { id: 1, image: "/images/banner.png", alt: "Slide 1" },
    { id: 2, image: "/images/den.png", alt: "Slide 2" },
    { id: 3, image: "/images/den.png", alt: "Slide 3" },
  ];

  
  

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Auto-slide effect (change every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);


  // ✅ Previous & Next Slide Functions
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full">
      <div className="carousel w-full h-[420px] relative overflow-hidden mt-20">
        <div className="carousel-body h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "hidden"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // console.error(`Error loading image: ${slide.image}`);
                  // e.target.src = "/images/banner.png"; // Fallback image
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {/* ✅ Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>

      {/* ✅ Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-gray-700" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
