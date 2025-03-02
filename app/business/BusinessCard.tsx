import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, Trash2, Edit2, Save, Link, ExternalLink } from 'lucide-react';
import { Profile, ProfileType } from '@/core/domain/profile/Profile';
import { ProfileLink } from '@/core/domain/profile/ProfileLink';

// Types for the business card data structure
interface CardSide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  links: ProfileLink[];
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

interface BusinessCardProps {
  profile?: Profile;
  editable?: boolean;
  onSave?: (sides: CardSide[]) => void;
  appearance?: any;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  profile,
  editable = false,
  onSave,
  appearance
}) => {
  // Extract profile theme colors or use defaults
  const defaultTheme = {
    bgColor: appearance?.theme === 'dark' ? '#1f2937' : '#ffffff',
    textColor: appearance?.theme === 'dark' ? '#f3f4f6' : '#1f2937',
    accentColor: appearance?.accent || '#3b82f6',
    secondaryColor: appearance?.theme === 'dark' ? '#374151' : '#f3f4f6',
  };

  const [currentSide, setCurrentSide] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [sides, setSides] = useState<CardSide[]>([]);
  const [editedSide, setEditedSide] = useState<CardSide | null>(null);

  // Initialize sides based on profile data
  useEffect(() => {
    if (profile) {
      // Create the default first side from profile data
      const initialSides: CardSide[] = [
        {
          id: 'side-1',
          title: profile.name || 'Your Name',
          subtitle: profile.username ? `@${profile.username}` : '@username',
          description: profile.description || 'Your professional description goes here',
          links: profile.links?.slice(0, 4) || [],
          bgColor: defaultTheme.bgColor,
          textColor: defaultTheme.textColor,
          accentColor: defaultTheme.accentColor
        }
      ];

      // If there are more links, create additional sides with groups of links
      if (profile.links && profile.links.length > 4) {
        const extraLinks = profile.links.slice(4);
        const linkGroups = [];

        // Group links in sets of 6 for additional sides
        for (let i = 0; i < extraLinks.length; i += 6) {
          linkGroups.push(extraLinks.slice(i, i + 6));
        }

        // Create a side for each group
        linkGroups.forEach((linkGroup, index) => {
          initialSides.push({
            id: `side-${index + 2}`,
            title: `More Links`,
            subtitle: `Page ${index + 2}`,
            description: '',
            links: linkGroup,
            bgColor: defaultTheme.bgColor,
            textColor: defaultTheme.textColor,
            accentColor: defaultTheme.accentColor
          });
        });
      }

      setSides(initialSides);
    } else {
      // Default empty card if no profile
      setSides([{
        id: 'side-1',
        title: 'Your Name',
        subtitle: '@username',
        description: 'Your professional description goes here',
        links: [],
        bgColor: defaultTheme.bgColor,
        textColor: defaultTheme.textColor,
        accentColor: defaultTheme.accentColor
      }]);
    }
  }, [profile]);

  const addNewSide = () => {
    if (!editable) return;

    const newSide: CardSide = {
      id: `side-${sides.length + 1}`,
      title: 'New Side',
      subtitle: 'Additional Information',
      description: 'Customize this side with your content',
      links: [],
      bgColor: defaultTheme.bgColor,
      textColor: defaultTheme.textColor,
      accentColor: defaultTheme.accentColor
    };

    setSides([...sides, newSide]);
    // Switch to the newly added side
    setCurrentSide(sides.length);
  };

  const removeSide = (index: number) => {
    if (!editable || sides.length <= 1 || index === 0) return; // Can't remove the first side

    const newSides = sides.filter((_, i) => i !== index);
    setSides(newSides);

    // Adjust current side if needed
    if (currentSide >= newSides.length) {
      setCurrentSide(newSides.length - 1);
    }

    // If onSave callback exists, call it with the updated sides
    if (onSave) {
      onSave(newSides);
    }
  };

  const nextSide = () => {
    if (currentSide < sides.length - 1) {
      setCurrentSide(currentSide + 1);
    } else {
      setCurrentSide(0); // Loop back to the first side
    }
  };

  const prevSide = () => {
    if (currentSide > 0) {
      setCurrentSide(currentSide - 1);
    } else {
      setCurrentSide(sides.length - 1); // Loop to the last side
    }
  };

  const startEditing = () => {
    if (!editable) return;
    setIsEditing(true);
    setEditedSide({...sides[currentSide]});
  };

  const saveEdits = () => {
    if (!editedSide) return;

    const newSides = [...sides];
    newSides[currentSide] = editedSide;
    setSides(newSides);
    setIsEditing(false);

    // If onSave callback exists, call it with the updated sides
    if (onSave) {
      onSave(newSides);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedSide(null);
  };

  const handleInputChange = (field: keyof CardSide, value: string) => {
    if (!editedSide) return;
    setEditedSide({
      ...editedSide,
      [field]: value
    });
  };

  // Get the current side to display
  const currentSideData = sides[currentSide] || sides[0];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Card container with perspective for 3D effect */}
      <div className="relative w-full perspective-1000">
        <motion.div
          className="relative w-full h-72 rounded-xl shadow-lg overflow-hidden"
          initial={false}
          animate={{ rotateY: currentSide * 180 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{
            transformStyle: "preserve-3d",
            backgroundColor: currentSideData?.bgColor || defaultTheme.bgColor,
            color: currentSideData?.textColor || defaultTheme.textColor
          }}
        >
          {isEditing && editable ? (
            /* Edit Mode */
            <div className="absolute inset-0 p-6 flex flex-col backface-visibility-hidden">
              <div className="mb-4 space-y-3">
                <input
                  type="text"
                  value={editedSide?.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editedSide?.subtitle || ''}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                  placeholder="Subtitle"
                />
                <textarea
                  value={editedSide?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 min-h-20"
                  placeholder="Description"
                />
              </div>

              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={saveEdits}
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Save size={16} className="mr-1" />
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="absolute inset-0 p-6 flex flex-col backface-visibility-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{currentSideData?.title}</h2>
                  <p className="text-sm opacity-80">{currentSideData?.subtitle}</p>
                </div>

                {/* Card side indicator */}
                <div className="px-2 py-1 rounded-full text-xs" style={{
                  backgroundColor: `${defaultTheme.secondaryColor}30`,
                }}>
                  {currentSide + 1} / {sides.length}
                </div>
              </div>

              {currentSideData?.description && (
                <p className="opacity-90 mb-4 text-sm">{currentSideData.description}</p>
              )}

              {/* Links section */}
              <div className="flex flex-col space-y-2 mt-auto">
                {currentSideData?.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 rounded-lg transition-colors text-sm"
                    style={{
                      backgroundColor: `${defaultTheme.secondaryColor}15`,
                    }}
                  >
                    <ExternalLink size={14} className="mr-2 opacity-70" />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card navigation controls */}
      <div className="flex items-center justify-between w-full mt-4">
        <button
          onClick={prevSide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={sides.length <= 1}
        >
          <ChevronLeft size={20} className={sides.length <= 1 ? "opacity-50" : ""} />
        </button>

        <div className="flex space-x-1">
          {sides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSide === index
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to side ${index + 1}`}
            />
          ))}

          {/* Add new side button (only in edit mode) */}
          {editable && !isEditing && (
            <button
              onClick={addNewSide}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 ml-2"
              aria-label="Add new side"
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        <button
          onClick={nextSide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={sides.length <= 1}
        >
          <ChevronRight size={20} className={sides.length <= 1 ? "opacity-50" : ""} />
        </button>
      </div>

      {/* Edit controls (only in edit mode and not currently editing) */}
      {editable && !isEditing && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={startEditing}
            className="flex items-center text-blue-500 text-sm hover:underline"
          >
            <Edit2 size={16} className="mr-1" />
            Edit this side
          </button>

          {currentSide > 0 && (
            <button
              onClick={() => removeSide(currentSide)}
              className="flex items-center text-red-500 text-sm hover:underline"
            >
              <Trash2 size={16} className="mr-1" />
              Remove this side
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessCard;