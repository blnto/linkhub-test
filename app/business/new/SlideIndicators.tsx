import React from 'react';
import { Phone, ShoppingBag, Tag, Image, Info } from 'lucide-react';

// Slide indicators with icons
const SlideIndicators = ({ slides, currentSlide, setCurrentSlide, setDirection, themeStyles }) => {
  // Get icon for navigation dots
  const getIcon = (slideId) => {
    const iconMap = {
      'main': <Phone size={16} />,
      'products': <ShoppingBag size={16} />,
      'services': <Tag size={16} />,
      'gallery': <Image size={16} />,
      'about': <Info size={16} />
    };

    return iconMap[slideId] || <Info size={16} />;
  };

  return (
    <div className="flex justify-center mt-4 space-x-1">
      {slides.map((slide, index) => (
        <button
          key={index}
          onClick={() => {
            setDirection(index > currentSlide ? 1 : -1);
            setCurrentSlide(index);
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            currentSlide === index
              ? 'bg-opacity-20'
              : 'bg-opacity-0 hover:bg-opacity-10'
          }`}
          style={{
            backgroundColor: currentSlide === index ? themeStyles.primary : 'transparent',
            color: themeStyles.primary
          }}
          aria-label={`Go to ${slide.id} card`}
        >
          {getIcon(slide.id)}
        </button>
      ))}
    </div>
  );
};

export default SlideIndicators;