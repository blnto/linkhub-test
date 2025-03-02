'use client';
import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ShoppingBag,
  Layers,
  Info,
  Tag,
  ExternalLink,
  User
} from 'lucide-react';

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
      id: "main",
      title: "Profile",
      icon: "user"
    },
    {
      id: "products",
      title: "Products",
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
      title: "Services",
      icon: "tag",
      content: [
        { name: "Phone Repair", description: "Screen replacement, battery replacement, and more", icon: "smartphone" },
        { name: "Computer Service", description: "Virus removal, hardware upgrades, data recovery", icon: "monitor" }
      ]
    },
    {
      id: "about",
      title: "About",
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

const SimplifiedMobileProfile = ({ profile = sampleProfile, recommendationsList = recommendations }) => {
  const [activeSection, setActiveSection] = useState("main");

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
    text: isDark ? '#e0e0e0' : '#333333',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    navBackground: isDark ? '#1a1a1a' : '#f7f7f7'
  };

  // Match icon to section type
  const getIconForSection = (sectionId) => {
    switch(sectionId) {
      case 'main': return <User size={20} />;
      case 'products': return <ShoppingBag size={20} />;
      case 'services': return <Tag size={20} />;
      case 'gallery': return <Layers size={20} />;
      case 'about': return <Info size={20} />;
      default: return <Info size={20} />;
    }
  };

  // Render the appropriate section content
  const renderSectionContent = () => {
    switch(activeSection) {
      case 'main':
        return (
          <div className="p-6">
            {/* Profile content */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                <img
                  src={profile.logo || getDefaultImage(80)}
                  alt={`${profile.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-base opacity-80">{profile.tagline}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              {profile.contact.phone && (
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="flex items-center"
                >
                  <Phone size={18} className="mr-3" color={accentColor} />
                  <span>{profile.contact.phone}</span>
                </a>
              )}

              {profile.contact.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center"
                >
                  <Mail size={18} className="mr-3" color={accentColor} />
                  <span>{profile.contact.email}</span>
                </a>
              )}

              {profile.contact.website && (
                <a
                  href={`https://${profile.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe size={18} className="mr-3" color={accentColor} />
                  <span>{profile.contact.website}</span>
                </a>
              )}

              {profile.contact.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(profile.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MapPin size={18} className="mr-3" color={accentColor} />
                  <span>{profile.contact.address}</span>
                </a>
              )}
            </div>

            {/* Links grid */}
            <h2 className="text-lg font-medium mb-3">Links</h2>
            <div className="grid grid-cols-2 gap-3">
              {profile.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 px-4 rounded-lg"
                  style={{
                    backgroundColor: `${accentColor}10`
                  }}
                >
                  <span className="text-sm font-medium">{link.name}</span>
                  <ExternalLink size={14} className="opacity-60" />
                </a>
              ))}
            </div>
          </div>
        );

      case 'products': {
        const productsSection = profile.sections.find(s => s.id === 'products');
        if (!productsSection || !productsSection.content || productsSection.content.length === 0) {
          return <div className="p-6 text-center">No products available</div>;
        }

        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Featured Products</h2>

            <div className="grid grid-cols-2 gap-4">
              {productsSection.content.map((product, index) => (
                <a
                  key={index}
                  href={product.url}
                  className="block rounded-lg overflow-hidden"
                >
                  <div className="h-32 bg-gray-100">
                    <img
                      src={product.image || getDefaultImage(150)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3" style={{ backgroundColor: `${accentColor}10` }}>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-bold mt-1" style={{ color: accentColor }}>{product.price}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Recommendations */}
            {activeSection === 'products' && recommendationsList && recommendationsList.length > 0 && (
              <div className="mt-8">
                <h3 className="text-base font-medium mb-4" style={{ color: theme.textSecondary }}>
                  You might also like
                </h3>

                <div className="space-y-3">
                  {recommendationsList.map((rec, index) => (
                    <a
                      key={index}
                      href={rec.url}
                      className="flex items-center p-3 rounded-lg"
                      style={{ backgroundColor: `${accentColor}10` }}
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
              </div>
            )}
          </div>
        );
      }

      case 'services': {
        const servicesSection = profile.sections.find(s => s.id === 'services');
        if (!servicesSection || !servicesSection.content || servicesSection.content.length === 0) {
          return <div className="p-6 text-center">No services available</div>;
        }

        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Our Services</h2>

            <div className="space-y-4">
              {servicesSection.content.map((service, index) => (
                <div
                  key={index}
                  className="p-5 rounded-lg"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <h3 className="text-lg font-medium mb-2">{service.name}</h3>
                  <p className="text-base" style={{ color: theme.textSecondary }}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about': {
        const aboutSection = profile.sections.find(s => s.id === 'about');

        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">About Us</h2>

            <div className="mb-6">
              <p className="text-base leading-relaxed">{profile.description}</p>
            </div>

            {aboutSection && aboutSection.details && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {aboutSection.details.established && (
                    <div
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Established</div>
                      <div className="text-xl font-bold">{aboutSection.details.established}</div>
                    </div>
                  )}

                  {aboutSection.details.employees && (
                    <div
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Team Size</div>
                      <div className="text-xl font-bold">{aboutSection.details.employees}</div>
                    </div>
                  )}

                  {aboutSection.details.established && (
                    <div
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <div className="text-sm font-medium mb-1" style={{ color: accentColor }}>Experience</div>
                      <div className="text-xl font-bold">
                        {new Date().getFullYear() - parseInt(aboutSection.details.established)} yrs
                      </div>
                    </div>
                  )}
                </div>

                {aboutSection.details.mission && (
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${accentColor}10` }}
                  >
                    <div className="text-sm font-medium mb-2" style={{ color: accentColor }}>Our Mission</div>
                    <p className="text-base italic">{aboutSection.details.mission}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      default:
        return <div className="p-6 text-center">Select a section</div>;
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{
        background: theme.background,
        color: theme.text
      }}
    >
      {/* Vertical navigation sidebar */}
      <div
        className="w-16 flex-shrink-0 flex flex-col items-center py-4"
        style={{
          backgroundColor: theme.navBackground,
          borderRight: isDark ? '1px solid #333' : '1px solid #eee'
        }}
      >
        {profile.sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 relative ${
                isActive ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: isActive ? accentColor : 'transparent',
                color: isActive ? '#fff' : theme.textSecondary,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            >
              {getIconForSection(section.id)}

              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main content area */}
      <div className="flex-grow overflow-y-auto">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default SimplifiedMobileProfile;