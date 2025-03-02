import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// A specialized side for business cards (products, gallery, etc)
const SpecializedCardSide = ({ type, data, onBack, onNext, cardIndex }) => {
  // Default placeholder image
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23888888'%3EImage%3C/text%3E%3C/svg%3E";

  // Render different card types
  const renderCardContent = () => {
    switch (type) {
      case 'products':
        return (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-3">Featured Products</h3>

            <div className="grid grid-cols-2 gap-3 flex-grow overflow-auto">
              {data.products?.map((product, i) => (
                <div key={i} className="flex flex-col bg-gray-100 rounded-lg overflow-hidden">
                  <div className="h-20 bg-gray-200">
                    <img
                      src={product.image || defaultImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-sm font-bold text-blue-600">{product.price}</p>
                  </div>
                </div>
              ))}

              {(!data.products || data.products.length === 0) && (
                <div className="col-span-2 py-8 text-center text-gray-500">
                  <p>No products to display</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-3">Gallery</h3>

            <div className="flex-grow overflow-auto">
              {data.images && data.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {data.images.map((image, i) => (
                    <div key={i} className="relative pb-[100%] bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image.url || defaultImage}
                        alt={image.caption || `Image ${i+1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No images to display</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-3">Our Services</h3>

            <div className="flex-grow overflow-auto">
              {data.services?.map((service, i) => (
                <div key={i} className="p-3 mb-3 bg-gray-100 rounded-lg">
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>
              ))}

              {(!data.services || data.services.length === 0) && (
                <div className="py-8 text-center text-gray-500">
                  <p>No services to display</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'about':
      default:
        return (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-3">About Us</h3>

            <div className="flex-grow overflow-auto">
              <p className="text-gray-700">{data.description || 'No description available'}</p>

              {data.established && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Established:</span> {data.established}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-56 rounded-xl bg-white shadow-lg flex flex-col p-5 relative overflow-hidden">
      {/* Card content based on type */}
      {renderCardContent()}

      {/* Navigation */}
      <div className="absolute bottom-3 w-full left-0 px-4 flex justify-between">
        <button
          onClick={onBack}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-xs text-gray-400">
          Card {cardIndex}
        </span>

        <button
          onClick={onNext}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SpecializedCardSide;