import React from 'react';
import RecommendationCard from './RecommendationCard';

// Recommendations section for cross-selling
const RecommendationsSection = ({ recommendations, themeStyles }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <h3
        className="text-sm font-medium mb-2"
        style={{ color: themeStyles ? themeStyles.textSecondary : 'inherit' }}
      >
        You might also like
      </h3>

      {recommendations.map((recommendation, index) => (
        <RecommendationCard
          key={index}
          recommendation={recommendation}
          themeStyles={themeStyles}
        />
      ))}
    </div>
  );
};

export default RecommendationsSection;