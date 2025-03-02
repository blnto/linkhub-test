import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import FlippableBusinessCard from './FlippableBusinessCard';
import SpecializedCardSide from './SpecializedCardSide';

// Default sample profile data
const defaultProfile = {
  name: "Ahmed's Electronics",
  title: "Quality Electronics at Competitive Prices",
  phone: "+973 1234 5678",
  email: "contact@ahmadelectronics.bh",
  website: "www.ahmadelectronics.bh",
  address: "Shop 42, Manama Souq, Bahrain",
  accentColor: '#0066cc',
  logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
  links: [
    { name: "Shop Online", url: "#" },
    { name: "Repair Services", url: "#" },
    { name: "Latest Offers", url: "#" }
  ]
};

// Sample specialized cards data
const sampleSpecializedCards = [
  {
    type: 'products',
    data: {
      products: [
        { name: "Samsung Galaxy S22", price: "BD 299", image: null },
        { name: "Apple iPhone 14", price: "BD 349", image: null },
        { name: "Sony Headphones", price: "BD 129", image: null },
        { name: "Dell XPS 13", price: "BD 499", image: null }
      ]
    }
  },
  {
    type: 'services',
    data: {
      services: [
        { name: "Phone Repair", description: "Screen replacement, battery replacement, and more" },
        { name: "Computer Service", description: "Virus removal, hardware upgrades, data recovery" }
      ]
    }
  },
  {
    type: 'about',
    data: {
      description: "Established in 2008, Ahmed's Electronics is a trusted provider of quality electronics, computers, and mobile devices in Bahrain. We also offer professional repair services for all major brands.",
      established: "2008"
    }
  }
];

const MultiSidedBusinessCard = ({
  profile = defaultProfile,
  specializedCards = sampleSpecializedCards,
  editable = false
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([{ isFlippable: true, profile }, ...specializedCards]);
  const [direction, setDirection] = useState(0);

  const totalCards = cards.length;

  // Navigation methods
  const goToNextCard = () => {
    setDirection(1);
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to the first card
    }
  };

  const goToPrevCard = () => {
    setDirection(-1);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(totalCards - 1); // Loop to the last card
    }
  };

  // Add a new specialized card (if in edit mode)
  const addSpecializedCard = (type) => {
    if (!editable) return;

    const newCard = {
      type,
      data: {}
    };

    setCards([...cards, newCard]);
  };

  // Animation variants for card transitions
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };

  // Determine which card to render based on index
  const renderCurrentCard = () => {
    const currentCard = cards[currentCardIndex];

    // If it's the main flippable card
    if (currentCard.isFlippable) {
      return <FlippableBusinessCard profile={profile} />;
    }

    // Otherwise it's a specialized card
    return (
      <SpecializedCardSide
        type={currentCard.type}
        data={currentCard.data}
        onBack={goToPrevCard}
        onNext={goToNextCard}
        cardIndex={`${currentCardIndex + 1}/${totalCards}`}
      />
    );
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* The card display area */}
      <div className="relative w-full h-56 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentCardIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            {renderCurrentCard()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card navigation indicators */}
      <div className="mt-5 flex items-center justify-center space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentCardIndex ? 1 : -1);
              setCurrentCardIndex(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentCardIndex === index
                ? 'bg-blue-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}

        {/* Add card button (only in edit mode) */}
        {editable && (
          <button
            onClick={() => addSpecializedCard('about')}
            className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 ml-1"
            aria-label="Add new card"
          >
            <Plus size={12} />
          </button>
        )}
      </div>

      {/* Arrow navigation buttons */}
      <div className="mt-4 flex w-full justify-between px-8">
        <button
          onClick={goToPrevCard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={goToNextCard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MultiSidedBusinessCard;