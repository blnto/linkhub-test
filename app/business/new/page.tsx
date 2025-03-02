'use client';
import React, { useState, useEffect } from 'react';
import VerticalBusinessCard from './VerticalBusinessCard';
import { Settings, Eye, X, Lock, Unlock, Check, Shield } from 'lucide-react';

// Sample data for Ahmed's Electronics profile
const ahmedProfile = {
  id: "ahmed123",
  name: "Ahmed's Electronics",
  username: "ahmedelectronics",
  title: "Quality Electronics at Competitive Prices",
  description: "Established in 2008, Ahmed's Electronics is a trusted provider of quality electronics, computers, and mobile devices in Bahrain. We also offer professional repair services for all major brands.",

  contact: {
    phone: "+973 1234 5678",
    email: "contact@ahmedelectronics.bh",
    website: "www.ahmedelectronics.bh",
    address: "Shop 42, Manama Souq, Bahrain",
    whatsapp: "+973 1234 5678"
  },

  links: [
    { name: "Shop Online", url: "#", icon: "shopping-cart" },
    { name: "Repair Services", url: "#", icon: "tool" },
    { name: "Latest Offers", url: "#", icon: "tag" },
    { name: "Find Us", url: "#", icon: "map-pin" }
  ],

  appearance: {
    theme: "light",
    layout: "classic",
    accent: "blue",
    roundedCorners: true,
    animation: true,
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E"
  },

  specializedContent: {
    products: [
      { name: "Samsung Galaxy S22", price: "BD 299", image: null, url: "#" },
      { name: "Apple iPhone 14", price: "BD 349", image: null, url: "#" },
      { name: "Sony Headphones", price: "BD 129", image: null, url: "#" },
      { name: "Dell XPS 13", price: "BD 499", image: null, url: "#" }
    ],

    services: [
      { name: "Phone Repair", description: "Screen replacement, battery replacement, and more", icon: "smartphone" },
      { name: "Computer Service", description: "Virus removal, hardware upgrades, data recovery", icon: "monitor" }
    ],

    gallery: [
      { url: null, caption: "Store front" },
      { url: null, caption: "Service center" },
      { url: null, caption: "Latest phones" },
      { url: null, caption: "Computer section" }
    ],

    offers: [
      { title: "Summer Sale", description: "20% off all smartphones", endDate: "2023-08-31" },
      { title: "Student Discount", description: "10% off with student ID", endDate: "2023-12-31" }
    ],

    about: {
      established: "2008",
      employees: "15+",
      mission: "To provide high-quality electronics and exceptional service at competitive prices."
    }
  }
};

// Sample recommendations data
const sampleRecommendations = [
  {
    id: "rec001",
    name: "Al-Safar Auto Accessories",
    description: "Premium car electronics and accessories",
    logo: null,
    accent: "#e74c3c",
    url: "#",
    reason: "Popular with Ahmed's Electronics customers"
  },
  {
    id: "rec002",
    name: "Data Security Solutions",
    description: "IT security and data backup services",
    logo: null,
    accent: "#2ecc71",
    url: "#",
    reason: "Complementary business service"
  }
];

const PasswordProtectedBusinessCardDemo = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [appearance, setAppearance] = useState(ahmedProfile.appearance);

  // Password protection states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Set a default password on first load
  useEffect(() => {
    // In a real app, this would come from your database
    setPassword('admin123');
  }, []);

  // Update the profile with the current appearance settings
  const currentProfile = {
    ...ahmedProfile,
    appearance: appearance
  };

  // Toggle preview mode (only available when authenticated)
  const togglePreviewMode = () => {
    if (isAuthenticated) {
      setIsPreviewMode(!isPreviewMode);
      if (isControlsOpen) setIsControlsOpen(false);
    }
  };

  // Toggle controls panel (only available when authenticated)
  const toggleControls = () => {
    if (isAuthenticated) {
      setIsControlsOpen(!isControlsOpen);
    }
  };

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (enteredPassword === password) {
      setIsAuthenticated(true);
      setPasswordError('');
      setAuthSuccess(true);

      // Reset success message after a delay
      setTimeout(() => {
        setAuthSuccess(false);
      }, 2000);
    } else {
      setPasswordError('Incorrect password');
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
    }

    setEnteredPassword('');
  };

  // Lock the profile again (logout)
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsControlsOpen(false);
    setIsPreviewMode(false);
  };

  // Update appearance settings
  const updateAppearance = (key, value) => {
    setAppearance({
      ...appearance,
      [key]: value
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isPreviewMode ? 'bg-gray-900' : 'bg-gray-50'
    } p-4 sm:p-6 md:p-8`}>
      {!isAuthenticated ? (
        // Password authentication screen
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Private Profile</h1>
            <p className="text-gray-600 mt-2">
              This business profile is password protected.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="profile-password" className="block text-sm font-medium text-gray-700 mb-1">
                Enter password to view
              </label>
              <input
                type="password"
                id="profile-password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  passwordError
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Enter password"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              View Business Card
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Contact the business owner if you need access.</p>
            <p className="mt-1">For demonstration, the password is: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span></p>
          </div>
        </div>
      ) : (
        // Authenticated view - show the business card
        <div className={`max-w-md mx-auto transition-all duration-300 ${
          isPreviewMode ? 'bg-transparent shadow-none p-0' : 'bg-white rounded-xl shadow-sm p-5 sm:p-6'
        }`}>
          {/* Header - Hidden in preview mode */}
          {!isPreviewMode && (
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-center">Business Card Demo</h1>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Lock size={16} className="mr-1" />
                Lock Profile
              </button>
            </div>
          )}

          {/* Phone mockup for preview mode */}
          <div className={`relative ${isPreviewMode ? 'mx-auto max-w-xs' : ''}`}>
            {isPreviewMode && (
              <div className="absolute inset-0 -m-4 rounded-3xl border-8 border-gray-800 -z-10 shadow-lg"></div>
            )}

            {/* The main card component */}
            <div className={`${isPreviewMode ? 'p-1' : ''}`}>
              <VerticalBusinessCard
                profile={currentProfile}
                recommendations={sampleRecommendations}
              />
            </div>
          </div>

          {/* Success notification */}
          {authSuccess && (
            <div className="fixed top-6 right-6 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center animate-fade-in-out">
              <Check size={16} className="mr-2" />
              Authentication successful
            </div>
          )}

          {/* Floating action buttons */}
          <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end space-y-reverse space-y-2">
            {/* Preview mode toggle */}
            <button
              onClick={togglePreviewMode}
              className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label={isPreviewMode ? "Exit preview mode" : "Enter preview mode"}
            >
              {isPreviewMode ? <Settings size={20} /> : <Eye size={20} />}
            </button>

            {/* Controls toggle */}
            {!isPreviewMode && (
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
          {isControlsOpen && !isPreviewMode && (
            <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-xl p-5 z-40 animate-slide-up sm:max-w-md sm:mx-auto sm:right-6 sm:left-auto sm:rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Appearance Settings</h2>
                <button
                  onClick={toggleControls}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Theme selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateAppearance('theme', 'light')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.theme === 'light'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => updateAppearance('theme', 'dark')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.theme === 'dark'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => updateAppearance('theme', 'gradient')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.theme === 'gradient'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Gradient
                  </button>
                </div>
              </div>

              {/* Layout selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Layout</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateAppearance('layout', 'classic')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.layout === 'classic'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    onClick={() => updateAppearance('layout', 'modern')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.layout === 'modern'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Modern
                  </button>
                  <button
                    onClick={() => updateAppearance('layout', 'minimal')}
                    className={`p-2 text-sm rounded border transition-colors ${
                      appearance.layout === 'minimal'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Minimal
                  </button>
                </div>
              </div>

              {/* Accent color selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Accent Color</h3>
                <div className="grid grid-cols-5 gap-2">
                  {['blue', 'pink', 'purple', 'orange', 'green', 'red', 'teal', 'amber', 'cyan', 'indigo'].map(color => (
                    <button
                      key={color}
                      onClick={() => updateAppearance('accent', color)}
                      className={`h-8 rounded-full border-2 transition-transform ${
                        appearance.accent === color
                          ? 'transform scale-110 border-gray-600'
                          : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor: getColorHex(color),
                      }}
                      aria-label={`${color} accent color`}
                    />
                  ))}
                </div>
              </div>

              {/* Toggle options */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rounded-corners"
                      checked={appearance.roundedCorners}
                      onChange={() => updateAppearance('roundedCorners', !appearance.roundedCorners)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="rounded-corners" className="ml-2 text-sm text-gray-700">
                      Rounded corners
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="animation"
                      checked={appearance.animation}
                      onChange={() => updateAppearance('animation', !appearance.animation)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="animation" className="ml-2 text-sm text-gray-700">
                      Animations
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 italic text-center mt-4">
                Changes are applied immediately
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to get hex color for accent colors
const getColorHex = (color) => {
  const colorMap = {
    blue: '#0066cc',
    pink: '#e91e63',
    purple: '#673ab7',
    orange: '#ff9800',
    green: '#4caf50',
    red: '#f44336',
    teal: '#009688',
    amber: '#ffc107',
    cyan: '#00bcd4',
    indigo: '#3f51b5'
  };

  return colorMap[color] || colorMap.blue;
};

export default PasswordProtectedBusinessCardDemo;