import React from 'react';

// About business section
const AboutSection = ({ profile, themeStyles }) => {
  const { description, specializedContent } = profile;
  const about = specializedContent?.about || {};

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-3" style={{ color: themeStyles.textPrimary }}>
        About Us
      </h3>

      <div className="flex-grow">
        <p style={{ color: themeStyles.textPrimary }}>{description}</p>

        {about && Object.keys(about).length > 0 && (
          <div
            className="mt-4 p-3 rounded-lg"
            style={{ backgroundColor: `${themeStyles.primary}10` }}
          >
            {about.established && (
              <p className="text-sm mb-1">
                <span className="font-medium" style={{ color: themeStyles.textPrimary }}>
                  Established:
                </span>
                <span style={{ color: themeStyles.textSecondary }}> {about.established}</span>
              </p>
            )}

            {about.employees && (
              <p className="text-sm mb-1">
                <span className="font-medium" style={{ color: themeStyles.textPrimary }}>
                  Team Size:
                </span>
                <span style={{ color: themeStyles.textSecondary }}> {about.employees}</span>
              </p>
            )}

            {about.mission && (
              <p className="text-sm mb-1">
                <span className="font-medium" style={{ color: themeStyles.textPrimary }}>
                  Our Mission:
                </span>
                <span style={{ color: themeStyles.textSecondary }}> {about.mission}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;