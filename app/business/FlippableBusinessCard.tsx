import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BusinessCardFront from './BusinessCardFront';
import BusinessCardBack from './BusinessCardBack';

const FlippableBusinessCard = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative perspective-1000 w-full">
      <motion.div
        className="w-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <BusinessCardFront profile={profile} onFlip={flipCard} />
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute w-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <BusinessCardBack profile={profile} onFlip={flipCard} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlippableBusinessCard;