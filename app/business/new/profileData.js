// src/data/profileData.js

// Appearance options and default values
export const appearanceOptions = {
  themes: ["light", "dark", "gradient"],
  layouts: ["classic", "modern", "minimal"],
  accentColors: [
    "blue", "pink", "purple", "orange", "green", "red", "teal", "amber", "cyan", "indigo"
  ],
};

// Profile data structure
export const profiles = {
  retail: {
    // Basic info
    id: "ahmed123",
    name: "Ahmed's Electronics",
    username: "ahmedelectronics",
    title: "Quality Electronics at Competitive Prices",
    description: "Established in 2008, Ahmed's Electronics is a trusted provider of quality electronics, computers, and mobile devices in Bahrain. We also offer professional repair services for all major brands.",

    // Contact info
    contact: {
      phone: "+973 1234 5678",
      email: "contact@ahmedelectronics.bh",
      website: "www.ahmedelectronics.bh",
      address: "Shop 42, Manama Souq, Bahrain",
      whatsapp: "+973 1234 5678"
    },

    // Social and external links
    links: [
      { name: "Shop Online", url: "#", icon: "shopping-cart" },
      { name: "Repair Services", url: "#", icon: "tool" },
      { name: "Latest Offers", url: "#", icon: "tag" },
      { name: "Find Us", url: "#", icon: "map-pin" }
    ],

    // Appearance settings
    appearance: {
      theme: "light",
      layout: "classic",
      accent: "blue",
      roundedCorners: true,
      animation: true,
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E"
    },

    // Specialized content for additional cards
    specializedContent: {
      // Featured products
      products: [
        { name: "Samsung Galaxy S22", price: "BD 299", image: null, url: "#" },
        { name: "Apple iPhone 14", price: "BD 349", image: null, url: "#" },
        { name: "Sony Headphones", price: "BD 129", image: null, url: "#" },
        { name: "Dell XPS 13", price: "BD 499", image: null, url: "#" }
      ],

      // Services offered
      services: [
        { name: "Phone Repair", description: "Screen replacement, battery replacement, and more", icon: "smartphone" },
        { name: "Computer Service", description: "Virus removal, hardware upgrades, data recovery", icon: "monitor" }
      ],

      // Gallery images
      gallery: [
        { url: null, caption: "Store front" },
        { url: null, caption: "Service center" },
        { url: null, caption: "Latest phones" },
        { url: null, caption: "Computer section" }
      ],

      // Special offers and promotions
      offers: [
        { title: "Summer Sale", description: "20% off all smartphones", endDate: "2023-08-31" },
        { title: "Student Discount", description: "10% off with student ID", endDate: "2023-12-31" }
      ],

      // Business details
      about: {
        established: "2008",
        employees: "15+",
        mission: "To provide high-quality electronics and exceptional service at competitive prices."
      }
    }
  },

  // Other profiles can be added here with the same structure
  realestate: {
    id: "khalid456",
    name: "Khalid Properties",
    username: "khalidproperties",
    title: "Premium Real Estate Development",
    description: "Since 2005, Khalid Properties has been developing premium real estate across Bahrain. Our portfolio includes residential towers, commercial complexes, and luxury villas.",

    // Other fields follow the same structure as above
    // ...
  }
};

// Recommendation data structure - for cross-selling ads
export const recommendations = {
  // Recommendations for Ahmed's Electronics users
  "ahmed123": [
    {
      id: "rec001",
      name: "Al-Safar Auto Accessories",
      description: "Premium car electronics and accessories",
      logo: null,
      accent: "red",
      url: "#",
      reason: "Popular with Ahmed's Electronics customers"
    },
    {
      id: "rec002",
      name: "Data Security Solutions",
      description: "IT security and data backup services",
      logo: null,
      accent: "teal",
      url: "#",
      reason: "Complementary business service"
    },
    {
      id: "rec003",
      name: "Manama Tech Hub",
      description: "Coding classes and tech workshops",
      logo: null,
      accent: "purple",
      url: "#",
      reason: "For tech enthusiasts"
    }
  ],

  // Recommendations can be added for other businesses
  // ...
};

// Helper functions to apply themes
export const getThemeStyles = (profile) => {
  const { appearance } = profile;
  const accent = appearance?.accent || "blue";

  // Color mapping
  const accentColors = {
    blue: { primary: '#0066cc', secondary: '#e6f0ff', text: '#0055aa' },
    pink: { primary: '#e91e63', secondary: '#fce4ec', text: '#c2185b' },
    purple: { primary: '#673ab7', secondary: '#ede7f6', text: '#512da8' },
    orange: { primary: '#ff9800', secondary: '#fff3e0', text: '#ef6c00' },
    green: { primary: '#4caf50', secondary: '#e8f5e9', text: '#2e7d32' },
    red: { primary: '#f44336', secondary: '#ffebee', text: '#c62828' },
    teal: { primary: '#009688', secondary: '#e0f2f1', text: '#00796b' },
    amber: { primary: '#ffc107', secondary: '#fff8e1', text: '#ff8f00' },
    cyan: { primary: '#00bcd4', secondary: '#e0f7fa', text: '#0097a7' },
    indigo: { primary: '#3f51b5', secondary: '#e8eaf6', text: '#303f9f' },
  };

  const colors = accentColors[accent] || accentColors.blue;

  // Theme-specific styles
  if (appearance?.theme === 'dark') {
    return {
      ...colors,
      background: '#1f2937',
      cardBackground: '#374151',
      textPrimary: '#f3f4f6',
      textSecondary: '#d1d5db',
      border: '#4b5563'
    };
  }

  if (appearance?.theme === 'gradient') {
    return {
      ...colors,
      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary}40)`,
      cardBackground: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    };
  }

  // Default light theme
  return {
    ...colors,
    background: '#ffffff',
    cardBackground: '#ffffff',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb'
  };
};

// Layout specific styles
export const getLayoutStyles = (profile) => {
  const { appearance } = profile;
  const layout = appearance?.layout || "classic";

  switch (layout) {
    case "modern":
      return {
        borderRadius: appearance?.roundedCorners ? '1rem' : '0.25rem',
        spacing: 'p-6',
        cardShadow: 'shadow-md'
      };
    case "minimal":
      return {
        borderRadius: appearance?.roundedCorners ? '0.5rem' : '0',
        spacing: 'p-4',
        cardShadow: 'shadow-sm'
      };
    case "classic":
    default:
      return {
        borderRadius: appearance?.roundedCorners ? '0.75rem' : '0.25rem',
        spacing: 'p-5',
        cardShadow: 'shadow'
      };
  }
};