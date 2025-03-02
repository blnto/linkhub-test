import React from 'react';

// Products grid display
const ProductsGridSection = ({ products, themeStyles }) => {
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23888888'%3EProduct%3C/text%3E%3C/svg%3E";

  if (!products || products.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-3" style={{ color: themeStyles.textPrimary }}>
        Featured Products
      </h3>

      <div className="grid grid-cols-2 gap-3 flex-grow overflow-y-auto">
        {products.map((product, i) => (
          <a key={i} href={product.url} className="block">
            <div
              className="flex flex-col rounded-lg overflow-hidden transition-all hover:shadow-md"
              style={{
                backgroundColor: `${themeStyles.primary}10`,
                borderColor: themeStyles.border
              }}
            >
              <div className="h-24 bg-gray-200">
                <img
                  src={product.image || defaultImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm" style={{ color: themeStyles.textPrimary }}>
                  {product.name}
                </h4>
                <p className="text-sm font-bold" style={{ color: themeStyles.primary }}>
                  {product.price}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductsGridSection;