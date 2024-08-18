import { useState } from "react";

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div className="relative">
        <img
          className="w-full h-64 object-contain"
          src={images[currentIndex]}
          alt={`{Product image ${currentIndex + 1}`}
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg"
        >
          &#10095;
        </button>
      </div>
    );
  }