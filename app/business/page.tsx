'use client';
import React, { useState } from 'react';
import MultiSidedBusinessCard from './MultiSidedBusinessCard';
import { Settings, X, Edit, Eye } from 'lucide-react';

// Sample profiles and cards data (same as before)
const profiles = {
  retail: {
    name: "Ahmed's Electronics",
    title: "Quality Electronics at Competitive Prices",
    phone: "+973 1234 5678",
    email: "contact@ahmedelectronics.bh",
    website: "www.ahmedelectronics.bh",
    address: "Shop 42, Manama Souq, Bahrain",
    accentColor: '#0066cc',
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
    links: [
      { name: "Shop Online", url: "#" },
      { name: "Repair Services", url: "#" },
      { name: "Latest Offers", url: "#" }
    ]
  },
  realestate: {
    name: "Khalid Properties",
    title: "Premium Real Estate Development",
    phone: "+973 1700 1234",
    email: "info@khalidproperties.bh",
    website: "www.khalidproperties.bh",
    address: "Bahrain Financial Harbour, Manama",
    accentColor: '#2c3e50',
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%232c3e50'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EK%3C/text%3E%3C/svg%3E",
    links: [
      { name: "Current Projects", url: "#" },
      { name: "Property Listings", url: "#" },
      { name: "Investment Opportunities", url: "#" }
    ]
  },
  hospitality: {
    name: "Al Noor Boutique Hotel",
    title: "Experience Authentic Bahraini Hospitality",
    phone: "+973 1758 9000",
    email: "reservations@alnoorhotel.bh",
    website: "www.alnoorhotel.bh",
    address: "Block 338, Adliya, Manama",
    accentColor: '#7d5a4a',
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%237d5a4a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
    links: [
      { name: "Book Now", url: "#" },
      { name: "Spa Services", url: "#" },
      { name: "Restaurant Menu", url: "#" }
    ]
  },
  creative: {
    name: "Alex Ray",
    title: "Indie Rock Musician & Songwriter",
    phone: "",
    email: "booking@alexray.com",
    website: "www.alexray.com",
    address: "Manama, Bahrain",
    accentColor: '#6200ea',
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%236200ea'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
    links: [
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
      { name: "Tour Dates", url: "#" }
    ]
  }
};

// Same specialized cards data as before
const specializedCards = {
  retail: [
    {
      type: 'products',
      data: {
        products: [
          { name: "Samsung Galaxy S22", price: "BD 299" },
          { name: "Apple iPhone 14", price: "BD 349" },
          { name: "Sony Headphones", price: "BD 129" },
          { name: "Dell XPS 13", price: "BD 499" }
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
  ],
  realestate: [
    {
      type: 'gallery',
      data: {
        images: [
          { url: null, caption: "Seef Residences" },
          { url: null, caption: "Marina Heights" },
          { url: null, caption: "Gulf View Villas" },
          { url: null, caption: "Manama Towers" }
        ]
      }
    },
    {
      type: 'about',
      data: {
        description: "Since 2005, Khalid Properties has been developing premium real estate across Bahrain. Our portfolio includes residential towers, commercial complexes, and luxury villas.",
        established: "2005"
      }
    }
  ],
  hospitality: [
    {
      type: 'services',
      data: {
        services: [
          { name: "Luxury Accommodations", description: "Elegantly designed rooms and suites with modern amenities" },
          { name: "Fine Dining", description: "Traditional Bahraini cuisine with contemporary flair" },
          { name: "Spa & Wellness", description: "Relaxing treatments and exclusive wellness programs" }
        ]
      }
    },
    {
      type: 'gallery',
      data: {
        images: [
          { url: null, caption: "Deluxe Room" },
          { url: null, caption: "Executive Suite" },
          { url: null, caption: "Restaurant" },
          { url: null, caption: "Rooftop Pool" }
        ]
      }
    }
  ],
  creative: [
    {
      type: 'gallery',
      data: {
        images: [
          { url: null, caption: "Live at Bahrain Bay" },
          { url: null, caption: "Studio Session" },
          { url: null, caption: "Album Cover" },
          { url: null, caption: "Music Video" }
        ]
      }
    },
    {
      type: 'about',
      data: {
        description: "Alex Ray is an indie rock musician based in Bahrain. With a unique sound that blends Western rock with Middle Eastern influences, Alex has been building a dedicated following since 2018.",
        established: "2018"
      }
    }
  ]
};

const CleanBusinessCardDemo = () => {
  const [activePersona, setActivePersona] = useState('retail');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  // Toggle controls panel
  const toggleControls = () => {
    setIsControlsOpen(!isControlsOpen);
  };

  // Toggle full view mode
  const toggleViewMode = () => {
    setIsViewMode(!isViewMode);
    // Close controls panel when entering view mode
    if (!isViewMode) setIsControlsOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isViewMode ? 'bg-gray-900' : 'bg-gray-50'
    } p-4 sm:p-6 md:p-8`}>
      <div className={`max-w-md mx-auto transition-all duration-300 ${
        isViewMode ? 'bg-transparent shadow-none p-0' : 'bg-white rounded-xl shadow-sm p-5 sm:p-6'
      }`}>
        {/* Header - Hidden in view mode */}
        {!isViewMode && (
          <h1 className="text-xl font-bold mb-6 text-center">Business Card Demo</h1>
        )}

        {/* Phone mockup for view mode */}
        <div className={`relative ${
          isViewMode ? 'mx-auto max-w-xs' : ''
        }`}>
          {isViewMode && (
            <div className="absolute inset-0 -m-4 rounded-3xl border-8 border-gray-800 -z-10 shadow-lg"></div>
          )}

          {/* The main card component */}
          <div className={`relative ${isViewMode ? 'p-1' : 'mb-8'}`}>
            <MultiSidedBusinessCard
              profile={profiles[activePersona]}
              specializedCards={specializedCards[activePersona]}
              editable={isEditMode}
            />
          </div>
        </div>

        {/* Floating action buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end space-y-reverse space-y-2">
          {/* Preview mode toggle */}
          <button
            onClick={toggleViewMode}
            className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            aria-label={isViewMode ? "Exit preview mode" : "Enter preview mode"}
          >
            {isViewMode ? <Edit size={20} /> : <Eye size={20} />}
          </button>

          {/* Controls toggle - hidden in view mode */}
          {!isViewMode && (
            <button
              onClick={toggleControls}
              className="w-12 h-12 rounded-full bg-gray-700 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label={isControlsOpen ? "Close controls" : "Open controls"}
            >
              {isControlsOpen ? <X size={20} /> : <Settings size={20} />}
            </button>
          )}
        </div>

        {/* Controls panel - slides in from bottom */}
        {isControlsOpen && !isViewMode && (
          <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-xl p-5 z-50 animate-slide-up sm:max-w-md sm:mx-auto sm:right-6 sm:left-auto sm:rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Controls</h2>
              <button
                onClick={toggleControls}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="font-medium text-gray-700 mb-3">Persona Selection</h3>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button
                onClick={() => setActivePersona('retail')}
                className={`p-2 text-sm rounded border transition-colors ${
                  activePersona === 'retail'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Ahmed (Electronics)
              </button>
              <button
                onClick={() => setActivePersona('realestate')}
                className={`p-2 text-sm rounded border transition-colors ${
                  activePersona === 'realestate'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Khalid (Real Estate)
              </button>
              <button
                onClick={() => setActivePersona('hospitality')}
                className={`p-2 text-sm rounded border transition-colors ${
                  activePersona === 'hospitality'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Aisha (Hotel)
              </button>
              <button
                onClick={() => setActivePersona('creative')}
                className={`p-2 text-sm rounded border transition-colors ${
                  activePersona === 'creative'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Alex (Musician)
              </button>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  isEditMode
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
              </button>

              <button
                onClick={toggleViewMode}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Preview Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanBusinessCardDemo;