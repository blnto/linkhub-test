import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import smaller components
import BusinessCardHeader from './BusinessCardHeader';
import ContactInfoSection from './ContactInfoSection';
import LinksGridSection from './LinksGridSection';
import ProductsGridSection from './ProductsGridSection';
import ServicesListSection from './ServicesListSection';
import AboutSection from './AboutSection';
import SlideIndicators from './SlideIndicators';
import RecommendationsSection from './RecommendationsSection';

// Helper functions to get theme and layout styles
import { getThemeStyles, getLayoutStyles } from './profileData';

const VerticalBusinessCard = ({ profile, recommendations = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Get theme and layout styles from profile
  const themeStyles = getThemeStyles(profile);
  const layoutStyles = getLayoutStyles(profile);

  // Define card content based on profile data
  const slides = [
    // Main card - Contact info
    {
      id: 'main',
      content: () => (
        <div className="h-full flex flex-col">
          <BusinessCardHeader profile={profile} themeStyles={themeStyles} />
          <ContactInfoSection contact={profile.contact} themeStyles={themeStyles} />
          <LinksGridSection links={profile.links} themeStyles={themeStyles} />
        </div>
      )
    },

    // Products card
    ...(profile.specializedContent.products?.length > 0 ? [{
      id: 'products',
      content: () => (
        <ProductsGridSection
          products={profile.specializedContent.products}
          themeStyles={themeStyles}
        />
      )
    }] : []),

    // Services card
    ...(profile.specializedContent.services?.length > 0 ? [{
      id: 'services',
      content: () => (
        <ServicesListSection
          services={profile.specializedContent.services}
          themeStyles={themeStyles}
        />
      )
    }] : []),

    // About card
    {
      id: 'about',
      content: () => (
        <AboutSection profile={profile} themeStyles={themeStyles} />
      )
    }
  ];

  // Navigation methods
  const goToNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const goToPrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction) => ({
      y: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Handle swipe gestures
  const handleDragEnd = (e, { offset }) => {
    const swipe = Math.abs(offset.x) > 50;

    if (swipe) {
      if (offset.x > 0) {
        goToPrevSlide();
      } else {
        goToNextSlide();
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto" style={{ color: themeStyles.textPrimary }}>
      {/* Main card container */}
      <div
        className={`w-full overflow-hidden ${layoutStyles.cardShadow}`}
        style={{
          backgroundColor: themeStyles.cardBackground,
          borderRadius: layoutStyles.borderRadius,
          minHeight: '450px',
          position: 'relative'
        }}
      >
        {/* Content area with slides */}
        <div className={`relative ${layoutStyles.spacing}`}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="h-96"
            >
              {slides[currentSlide].content()}
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <SlideIndicators
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            setDirection={setDirection}
            themeStyles={themeStyles}
          />
        </div>

        {/* Navigation arrows - now inside the card */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          style={{
            backgroundColor: `${themeStyles.primary}30`,
            color: themeStyles.primary
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          style={{
            backgroundColor: `${themeStyles.primary}30`,
            color: themeStyles.primary
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Recommendations section - now themed */}
      <div className="mt-5 mb-3">
        <RecommendationsSection
          recommendations={recommendations}
          themeStyles={themeStyles}
        />
      </div>
    </div>
  );
};

export default VerticalBusinessCard;