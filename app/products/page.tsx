'use client'

import { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'gaming-hardware', name: 'Gaming Hardware' },
    { id: 'peripherals', name: 'Gaming Peripherals' },
    { id: 'accessories', name: 'Gaming Accessories' },
    { id: 'software', name: 'Gaming Software' }
  ];

  const products = [
    {
      id: 1,
      name: 'Gaming Headset Pro',
      category: 'peripherals',
      price: '150',
      originalPrice: '180',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviews: 124,
      discount: 17,
      inStock: true,
      description: 'High-quality gaming headset with surround sound and noise cancellation'
    },
    {
      id: 2,
      name: 'Mechanical Gaming Keyboard',
      category: 'peripherals',
      price: '120',
      originalPrice: '140',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      reviews: 89,
      discount: 14,
      inStock: true,
      description: 'RGB mechanical keyboard with customizable keys and macros'
    },
    {
      id: 3,
      name: 'Gaming Graphics Card RTX',
      category: 'gaming-hardware',
      price: '500',
      originalPrice: '600',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      reviews: 45,
      discount: 17,
      inStock: true,
      description: 'High-performance graphics card for 4K gaming and ray tracing'
    },
    {
      id: 4,
      name: 'Gaming Chair Ultimate',
      category: 'accessories',
      price: '300',
      originalPrice: '350',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      reviews: 23,
      discount: 14,
      inStock: false,
      description: 'Ergonomic gaming chair with lumbar support and adjustable height'
    },
    {
      id: 5,
      name: 'Gaming Mouse Precision',
      category: 'peripherals',
      price: '80',
      originalPrice: '90',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      reviews: 234,
      discount: 11,
      inStock: true,
      description: 'High-precision gaming mouse with customizable DPI settings'
    },
    {
      id: 6,
      name: 'VR Gaming Headset',
      category: 'gaming-hardware',
      price: '400',
      originalPrice: '450',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      reviews: 156,
      discount: 11,
      inStock: true,
      description: 'Virtual reality headset for immersive gaming experiences'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black" >
      <div className="absolute inset-0 overflow-hidden">
        {[60, 80, 100, 120, 90, 70, 110, 85].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/15 to-blue-500/15"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 12) % 100}%`,
              top: `${(i * 18) % 100}%`,
              animation: `float ${12 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(25px, -25px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-25px, -15px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-content container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Gaming Products
          </h1>
          <p className="text-cyan-300 text-lg">
            Premium gaming equipment with high quality
          </p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              />
            </div>

            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden hover:shadow-cyan-400/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-cyan-400 text-6xl">🎮</div>
                </div>
                
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
                
                <button className="absolute top-4 left-4 p-2 bg-gray-700/80 border border-cyan-400 rounded-full hover:bg-gray-600 transition-colors">
                  <Heart className="w-5 h-5 text-cyan-400" />
                </button>
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-cyan-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400">
              Please try different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;