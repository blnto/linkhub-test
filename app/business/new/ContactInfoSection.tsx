import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

// Contact information section with phone, email, website, address
const ContactInfoSection = ({ contact, themeStyles }) => {
  return (
    <div className="flex flex-col space-y-3 mt-3">
      {/* Phone */}
      {contact.phone && (
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center text-sm p-2 rounded-lg"
          style={{ backgroundColor: `${themeStyles.primary}15` }}
        >
          <Phone size={16} className="mr-3" style={{ color: themeStyles.primary }} />
          <span style={{ color: themeStyles.textPrimary }}>{contact.phone}</span>
        </a>
      )}

      {/* Email */}
      {contact.email && (
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center text-sm p-2 rounded-lg"
          style={{ backgroundColor: `${themeStyles.primary}15` }}
        >
          <Mail size={16} className="mr-3" style={{ color: themeStyles.primary }} />
          <span style={{ color: themeStyles.textPrimary }}>{contact.email}</span>
        </a>
      )}

      {/* Website */}
      {contact.website && (
        <a
          href={`https://${contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm p-2 rounded-lg"
          style={{ backgroundColor: `${themeStyles.primary}15` }}
        >
          <Globe size={16} className="mr-3" style={{ color: themeStyles.primary }} />
          <span style={{ color: themeStyles.textPrimary }}>{contact.website}</span>
        </a>
      )}

      {/* Address */}
      {contact.address && (
        <div
          className="flex items-start text-sm p-2 rounded-lg"
          style={{ backgroundColor: `${themeStyles.primary}15` }}
        >
          <MapPin size={16} className="mr-3 mt-0.5" style={{ color: themeStyles.primary }} />
          <span style={{ color: themeStyles.textPrimary }}>{contact.address}</span>
        </div>
      )}
    </div>
  );
};

export default ContactInfoSection;