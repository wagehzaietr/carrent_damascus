import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageCarousel = ({ images, carName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const isRTL = language === 'ar';

  return (
    <div className="relative bg-surface rounded-lg overflow-hidden">
      {/* Main Image Display */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${carName} - ${language === 'ar' ? 'صورة' : 'Image'} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-10 h-10 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-all duration-200 shadow-md`}
        >
          <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} />
        </button>
        
        <button
          onClick={nextImage}
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-all duration-200 shadow-md`}
        >
          <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="p-4 bg-background">
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${carName} - ${language === 'ar' ? 'مصغرة' : 'Thumbnail'} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;