import React from 'react';

// Recommendation card for cross-selling
const RecommendationCard = ({ recommendation, themeStyles }) => {
  const defaultLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23888888'%3ELogo%3C/text%3E%3C/svg%3E";

  // Apply theme styles if available
  const cardStyle = themeStyles ? {
    backgroundColor: themeStyles.cardBackground,
    borderColor: themeStyles.border,
    color: themeStyles.textPrimary
  } : {};

  const titleStyle = themeStyles ? {
    color: themeStyles.textPrimary
  } : {};

  const descriptionStyle = themeStyles ? {
    color: themeStyles.textSecondary
  } : {};

  const reasonStyle = themeStyles ? {
    color: `${themeStyles.textSecondary}80` // Semi-transparent
  } : {};

  return (
    <a
      href={recommendation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-lg overflow-hidden shadow-sm border mb-3 transition-transform hover:scale-102"
      style={cardStyle}
    >
      <div className="flex items-center p-3">
        <div
          className="w-10 h-10 rounded overflow-hidden flex-shrink-0"
          style={{ backgroundColor: recommendation.accent || '#f3f4f6' }}
        >
          <img
            src={recommendation.logo || defaultLogo}
            alt={recommendation.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 flex-grow">
          <h4 className="text-sm font-medium" style={titleStyle}>{recommendation.name}</h4>
          <p className="text-xs" style={descriptionStyle}>{recommendation.description}</p>
        </div>
      </div>

      {recommendation.reason && (
        <div className="px-3 pb-2">
          <div className="text-xs italic" style={reasonStyle}>
            {recommendation.reason}
          </div>
        </div>
      )}
    </a>
  );
};

export default RecommendationCard;