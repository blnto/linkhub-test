import React from 'react';
import { ExternalLink } from 'lucide-react';

// Grid of links
const LinksGridSection = ({ links, themeStyles, maxLinks = 4 }) => {
  return (
    <div className="mt-auto pt-4">
      <h3 className="text-sm font-medium mb-2" style={{ color: themeStyles.textPrimary }}>
        Links & Resources
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {links.slice(0, maxLinks).map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs p-2 rounded-lg border transition-all hover:shadow-sm"
            style={{
              borderColor: themeStyles.border,
              color: themeStyles.textPrimary,
              backgroundColor: themeStyles.cardBackground
            }}
          >
            <span>{link.name}</span>
            <ExternalLink size={12} className="ml-auto opacity-70" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksGridSection;