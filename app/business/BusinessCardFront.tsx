import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

// Simple front side of a business card
const BusinessCardFront = ({ profile, onFlip }) => {
  const defaultLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23888888'%3ELogo%3C/text%3E%3C/svg%3E";

  return (
    <div className="w-full h-56 rounded-xl bg-white shadow-lg flex flex-col p-5 relative overflow-hidden">
      {/* Colored accent corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 transform rotate-45 translate-x-12 -translate-y-12"
        style={{ backgroundColor: profile.accentColor || '#3b82f6' }}
      />

      <div className="flex items-start mb-4">
        {/* Logo */}
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={profile.logo || defaultLogo}
            alt={`${profile.name} logo`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name and title */}
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{profile.name || 'Business Name'}</h2>
          <p className="text-sm text-gray-600">{profile.title || 'Your Tagline Here'}</p>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-col mt-auto space-y-1.5">
        {profile.phone && (
          <div className="flex items-center text-sm">
            <Phone size={14} className="text-gray-500 mr-2" />
            <span>{profile.phone}</span>
          </div>
        )}

        {profile.email && (
          <div className="flex items-center text-sm">
            <Mail size={14} className="text-gray-500 mr-2" />
            <span>{profile.email}</span>
          </div>
        )}

        {profile.website && (
          <div className="flex items-center text-sm">
            <Globe size={14} className="text-gray-500 mr-2" />
            <span>{profile.website}</span>
          </div>
        )}
      </div>

      {/* Flip indicator */}
      <button
        onClick={onFlip}
        className="absolute bottom-3 right-3 p-2 text-xs text-gray-400 hover:text-gray-600"
      >
        Tap to flip →
      </button>
    </div>
  );
};

export default BusinessCardFront;