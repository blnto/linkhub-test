import React from 'react';

// Business card header with logo and business name
const BusinessCardHeader = ({ profile, themeStyles }) => {
  return (
    <div className="flex items-start mb-4">
      {/* Logo */}
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={profile.appearance.logo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3ELogo%3C/text%3E%3C/svg%3E"}
          alt={`${profile.name} logo`}
          className="w-full h-full object-contain"
          style={{ backgroundColor: themeStyles.primary }}
        />
      </div>

      {/* Business name and tagline */}
      <div className="ml-3">
        <h2 className="text-xl font-bold" style={{ color: themeStyles.textPrimary }}>
          {profile.name}
        </h2>
        <p className="text-sm" style={{ color: themeStyles.textSecondary }}>
          {profile.title}
        </p>
      </div>
    </div>
  );
};

export default BusinessCardHeader;