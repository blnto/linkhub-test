import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Simple back side of a business card with links
const BusinessCardBack = ({ profile, onFlip }) => {
  return (
    <div
      className="w-full h-56 rounded-xl shadow-lg flex flex-col p-5 relative overflow-hidden"
      style={{
        backgroundColor: profile.accentColor || '#3b82f6',
        color: '#fff'
      }}
    >
      {/* Card pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: '#fff',
                opacity: Math.random() * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-3 relative">Links & Resources</h3>

      {/* Links */}
      <div className="space-y-2 relative z-10">
        {profile.links && profile.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          >
            <span>{link.name}</span>
            <ArrowUpRight size={16} />
          </a>
        ))}

        {(!profile.links || profile.links.length === 0) && (
          <div className="py-6 text-center text-white text-opacity-70">
            <p>No links added yet</p>
          </div>
        )}
      </div>

      {/* Business address or additional info */}
      {profile.address && (
        <div className="mt-auto pt-4 text-sm text-white text-opacity-80 relative">
          <p>{profile.address}</p>
        </div>
      )}

      {/* Flip indicator */}
      <button
        onClick={onFlip}
        className="absolute bottom-3 right-3 p-2 text-xs text-white text-opacity-70 hover:text-opacity-100"
      >
        ← Tap to flip
      </button>
    </div>
  );
};

export default BusinessCardBack;