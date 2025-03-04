'use client';
import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ShoppingBag,
  Layers,
  Info,
  Tag,
  ExternalLink
} from 'lucide-react';

interface Profile {
  name: string;
  username: string;
  tagline: string;
  description: string;
  logo: string;
  appearance: {
    accent: string;
    theme: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  links: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  sections: Array<{
    id: string;
    title: string;
    icon: string;
    content?: Array<any>;
    details?: {
      established?: string;
      employees?: string;
      mission?: string;
    };
  }>;
}

// Sample profile data (would be passed as props in real implementation)
const sampleProfile = {
  name: "Ahmed's Electronics",
  username: "ahmedelectronics",
  tagline: "Quality Electronics at Competitive Prices",
  description: "Established in 2008, Ahmed's Electronics is a trusted provider of quality electronics, computers, and mobile devices in Bahrain. We also offer professional repair services for all major brands.",
  logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230066cc'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
  appearance: {
    accent: "#0066cc",
    theme: "light"
  },
  contact: {
    phone: "+973 1234 5678",
    email: "contact@ahmedelectronics.bh",
    website: "www.ahmedelectronics.bh",
    address: "Shop 42, Manama Souq, Bahrain"
  },
  links: [
    { name: "Shop Online", url: "#", icon: "shopping-cart" },
    { name: "Repair Services", url: "#", icon: "tool" },
    { name: "Latest Offers", url: "#", icon: "tag" },
    { name: "Find Us", url: "#", icon: "map-pin" }
  ],
  sections: [
    {
      id: "products",
      title: "Featured Products",
      icon: "shopping-bag",
      content: [
        { name: "Samsung Galaxy S22", price: "BD 299", image: null, url: "#" },
        { name: "Apple iPhone 14", price: "BD 349", image: null, url: "#" },
        { name: "Sony Headphones", price: "BD 129", image: null, url: "#" },
        { name: "Dell XPS 13", price: "BD 499", image: null, url: "#" }
      ]
    },
    {
      id: "services",
      title: "Our Services",
      icon: "tag",
      content: [
        { name: "Phone Repair", description: "Screen replacement, battery replacement, and more", icon: "smartphone" },
        { name: "Computer Service", description: "Virus removal, hardware upgrades, data recovery", icon: "monitor" }
      ]
    },
    {
      id: "about",
      title: "About Us",
      icon: "info",
      details: {
        established: "2008",
        employees: "15+",
        mission: "To provide high-quality electronics and exceptional service at competitive prices."
      }
    }
  ]
};

// Recommendation data
const recommendations = [
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

const ModernMobileProfile = ({ profile = sampleProfile }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sectionPositions, setSectionPositions] = useState({});

  // Detect scroll position for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate section positions after render
  useEffect(() => {
    const positions = {};

    profile.sections.forEach(section => {
      const element = document.getElementById(`section-${section.id}`);
      if (element) {
        positions[section.id] = element.offsetTop - 100; // Offset for better UX
      }
    });

    setSectionPositions(positions);

    // Update active section based on scroll position
    const updateActiveSection = () => {
      const scrollPos = window.scrollY;

      // Find the current section
      let current = null;

      Object.entries(positions).forEach(([id, position]) => {
        if (scrollPos >= position) {
          current = id;
        }
      });

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [profile.sections, activeSection]);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const position = sectionPositions[sectionId];
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  };

  // Get default image
  const getDefaultImage = (size = 150) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect width='${size}' height='${size}' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='${size/10}' text-anchor='middle' dominant-baseline='middle' fill='%23888888'%3EImage%3C/text%3E%3C/svg%3E`;
  };

  // Base colors based on theme
  const isDark = profile.appearance.theme === 'dark';
  const accentColor = profile.appearance.accent || "#0066cc";

  // Compute theme styles
  const theme = {
    primary: accentColor,
    background: isDark ? '#121212' : '#ffffff',
    card: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#e0e0e0' : '#333333',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    border: isDark ? '#333333' : '#eeeeee'
  };

  return (
    <div style={{ background: theme.background, color: theme.text, minHeight: '100vh' }}>
      {/* Sticky Floating Navigation */}
      <div className="fixed z-10 bottom-5 left-1/2 transform -translate-x-1/2"
           style={{
             backgroundColor: theme.card,
             borderRadius: '9999px',
             boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
             border: `1px solid ${theme.border}`
           }}>
        <div className="flex px-2 py-2 space-x-1">
          {profile.sections.map((section) => {
            // Match icon to section type
            let SectionIcon;
            switch(section.id) {
              case 'products': SectionIcon = ShoppingBag; break;
              case 'services': SectionIcon = Tag; break;
              case 'gallery': SectionIcon = Layers; break;
              case 'about': SectionIcon = Info; break;
              default: SectionIcon = Info;
            }

            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex flex-col items-center p-2 rounded-full"
                style={{
                  backgroundColor: isActive ? `${accentColor}15` : 'transparent',
                  minWidth: '4rem'
                }}
              >
                <SectionIcon
                  size={20}
                  color={isActive ? accentColor : theme.textSecondary}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className="text-xs mt-1"
                  style={{
                    color: isActive ? accentColor : theme.textSecondary,
                    fontWeight: isActive ? '500' : 'normal'
                  }}
                >
                  {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center pt-10 pb-8 px-6"
        style={{
          background: `linear-gradient(180deg, ${accentColor}30 0%, ${theme.background} 100%)`,
        }}
      >
        {/* Logo with animated pulse */}
        <div
          className="p-1 rounded-full mb-4"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={profile.logo || getDefaultImage(80)}
              alt={`${profile.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and tagline */}
        <h1 className="text-2xl font-bold text-center mb-1">{profile.name}</h1>
        <p className="text-base opacity-80 text-center mb-6">{profile.tagline}</p>

        {/* Quick contact buttons */}
        <div className="flex space-x-3 mb-6">
          {profile.contact.phone && (
            <a
              href={`tel:${profile.contact.phone}`}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: theme.card, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              aria-label="Phone"
            >
              <Phone size={18} color={accentColor} />
            </a>
          )}

          {profile.contact.email && (
            <a
              href={`mailto:${profile.contact.email}`}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: theme.card, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              aria-label="Email"
            >
              <Mail size={18} color={accentColor} />
            </a>
          )}

          {profile.contact.website && (
            <a
              href={`https://${profile.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: theme.card, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              aria-label="Website"
            >
              <Globe size={18} color={accentColor} />
            </a>
          )}

          {profile.contact.address && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(profile.contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: theme.card, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              aria-label="Location"
            >
              <MapPin size={18} color={accentColor} />
            </a>
          )}
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {profile.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 px-3 rounded-lg"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <span className="text-sm font-medium">{link.name}</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 pb-24">
        {/* Products Section */}
        {profile.sections.find(s => s.id === 'products') && (
          <section id="section-products" className="py-6">
            <h2 className="text-xl font-bold mb-4">Featured Products</h2>

            <div className="grid grid-cols-2 gap-3">
              {profile.sections.find(s => s.id === 'products').content.map((product, index) => (
                <a
                  key={index}
                  href={product.url}
                  className="block rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="h-32 bg-gray-100">
<img
  src={product.image || getDefaultImage(150)}
  alt={product.name || 'Product image'}
  className="w-full h-full object-cover"
/>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-bold mt-1" style={{ color: accentColor }}>{product.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Services Section */}
        {profile.sections.find(s => s.id === 'services') && (
          <section id="section-services" className="py-6">
            <h2 className="text-xl font-bold mb-4">Our Services</h2>

            <div className="space-y-3">
              {profile.sections.find(s => s.id === 'services').content.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <h3 className="text-base font-medium mb-1">{service.name}</h3>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>{service.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About Section */}
        {profile.sections.find(s => s.id === 'about') && (
          <section id="section-about" className="py-6">
            <h2 className="text-xl font-bold mb-4">About Us</h2>

            <div
              className="p-4 rounded-lg mb-4"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-base leading-relaxed">{profile.description}</p>
            </div>

            {/* About details */}
            {profile.sections.find(s => s.id === 'about').details && (
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: `${accentColor}10`,
                  border: `1px solid ${accentColor}20`
                }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {profile.sections.find(s => s.id === 'about').details.established && (
                    <div className="text-center p-2">
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Established</div>
                      <div className="text-2xl font-bold">{profile.sections.find(s => s.id === 'about').details.established}</div>
                    </div>
                  )}

                  {profile.sections.find(s => s.id === 'about').details.employees && (
                    <div className="text-center p-2">
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Team Size</div>
                      <div className="text-2xl font-bold">{profile.sections.find(s => s.id === 'about').details.employees}</div>
                    </div>
                  )}

                  {profile.sections.find(s => s.id === 'about').details.established && (
                    <div className="text-center p-2">
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Experience</div>
                      <div className="text-2xl font-bold">
                        {new Date().getFullYear() - parseInt(profile.sections.find(s => s.id === 'about').details.established)} yrs
                      </div>
                    </div>
                  )}
                </div>

                {profile.sections.find(s => s.id === 'about').details.mission && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: `${accentColor}20` }}>
                    <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Our Mission</div>
                    <p className="text-sm italic">{profile.sections.find(s => s.id === 'about').details.mission}</p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Recommendations Section */}
        {recommendations && recommendations.length > 0 && (
          <section className="py-6">
            <h2 className="text-base font-medium mb-3" style={{ color: theme.textSecondary }}>You might also like</h2>

            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <a
                  key={index}
                  href={rec.url}
                  className="flex items-center p-3 rounded-lg"
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: rec.accent || accentColor }}
                  >
                    <img
                      src={rec.logo || getDefaultImage(40)}
                      alt={rec.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <h3 className="text-sm font-medium">{rec.name}</h3>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>{rec.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernMobileProfile;