import React from 'react';

// Services list display
const ServicesListSection = ({ services, themeStyles }) => {
  if (!services || services.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-gray-500">No services available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-3" style={{ color: themeStyles.textPrimary }}>
        Our Services
      </h3>

      <div className="flex-grow overflow-y-auto">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-3 mb-3 rounded-lg transition-all hover:shadow-sm"
            style={{ backgroundColor: `${themeStyles.primary}10` }}
          >
            <h4 className="font-medium" style={{ color: themeStyles.textPrimary }}>
              {service.name}
            </h4>
            <p className="text-sm mt-1" style={{ color: themeStyles.textSecondary }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesListSection;