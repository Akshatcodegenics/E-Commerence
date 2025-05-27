import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Star, X } from 'lucide-react';

const ShopPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: category ? [category] : [],
    price: '',
    sort: 'featured',
    hero: []
  });

  // Mock product data - in real app, fetch from backend
  const mockProducts = [
    {
      id: 1,
      name: "Marvel Universe Oversized T-Shirts",
      price: 
      329.99,
      image: "./ShopPage/OversizedTee.webp",
      category: "oversized",
      hero: "marvel-universe",
      rating: 4.5,
      reviewCount: 24,
      isNew: true
    },
    {
      id: 2,
      name: "DC Comics Acid Wash T-Shirts",
      price: 239.99,
      image: "./ShopPage/AcidWashTees.jpeg",
      category: "acid-wash",
      hero: "dc-comics",
      rating: 5.0,
      reviewCount: 42,
      isNew: false
    },
    {
      id: 3,
      name: "Anime Superheroes Graphic Printed Tee",
      price: 579.99,
      image: "./ShopPage/GraphicPrintedTee.webp",
      category: "graphic-printed",
      hero: "anime-superheroes",
      rating: 4.2,
      reviewCount: 18,
      isNew: false
    },
    {
      name: "Custom Fan Art Hooded T-Shirts",
      price: 1099.99,
      image: "./ShopPage/HoodedTees.jpeg",
      category: "hooded",
      hero: "custom-fan-art",
      rating: 4.8,
      reviewCount: 36,
      isNew: true
    },
    {
      id: 5,
      name: "Video Game characters Logo Henley T-shirts",
      price: 749.99,
      image: "./ShopPage/VideoGameCharactersHenleyTees.jpeg",
      category: "henley",
      hero: "video-game-characters",
      rating: 4.0,
      reviewCount: 15,
      isNew: false
    },
    {
      id: 6,
      name: "Sci-Fi & Fantasy Long Sleeve T-Shirts",
      price: 599.99,
      image: "./ShopPage/Sci-Fi&FantasyLongSleeveTees.webp",
      category: "long-sleeve",
      hero: "sci-fi",
      rating: 4.6,
      reviewCount: 22,
      isNew: false
    },
    {
      id: 7,
      name: "Classic Comics Sleeveless Tees",
      price: 249.99,
      image: "./ShopPage/ClassicComicsSleevelessTees.webp",
      category: "sleeveless",
      hero: "classic-comics",
      rating: 4.3,
      reviewCount: 31,
      isNew: false
    },
    {
      id: 8,
      name: "Anime Superheroes Polo T-Shirts",
      price: 199.99,
      image: "./ShopPage/AnimeSuperheroesTees.webp",
      category: "polo-t-shirts",
      hero: "anime-superheroes",
      rating: 4.9,
      reviewCount: 13,
      isNew: true
    },
    {
      id: 9,
      name: "Custom Fan Art Solid Color T-Shirts",
      price: 449.99,
      image: "./ShopPage/CustomFanArtSolidTees.jpeg",
      category: "solid-color",
      hero: "custom-fan-art",
      rating: 4.4,
      reviewCount: 19,
      isNew: false
    },
    {
      id: 10,
      name: "DC Comics Oversized T-Shirts",
      price: 679.99,
      image: "./ShopPage/DCComicsOversizeTees.webp",
      category: "oversized",
      hero: "dc-comics",
      rating: 4.7,
      reviewCount: 27,
      isNew: false
    },
    {
      id: 11,
      name: "Marvel Universe Henley T-Shirts",
      price: 499.99,
      image: "./ShopPage/MarvelUniverseHenleyTees.jpeg",
      category: "henley",
      hero: "marvel-universe",
      rating: 4.1,
      reviewCount: 14,
      isNew: true
    },
    {
      id: 12,
      name: "Classic Comics Hooded Tees",
      price: 1299.99,
      image: "./ShopPage/ClassicComicsHoodedTees.webp",
      category: "hooded",
      hero: "classic-comics",
      rating: 4.5,
      reviewCount: 23,
      isNew: false
    }
  ];

  // Filter categories
  const categories = [
    { id: 'oversized', name: 'Oversized' },
    { id: 'acid-wash', name: 'Acid Wash' },
    { id: 'graphic-printed', name: 'Graphic Printed' },
    { id: 'solid-color', name: 'Solid Color' },
    { id: 'polo-t-shirts', name: 'Polo T-Shirts' },
    { id: 'sleeveless', name: 'Sleeveless' },
    { id: 'long-sleeve', name: 'Long Sleeve' },
    { id: 'henley', name: 'Henley' },
    { id: 'hooded', name: 'Hooded' }
  ];


 // Hero filters
 const heroes = [
  { id: 'marvel-universe', name: 'Marvel Universe' },
  { id: 'dc-comics', name: 'DC Comics' },
  { id: 'anime-superheroes', name: 'Anime Superheroes' },
  { id: 'classic-comics', name: 'Classic Comics' },
  { id: 'sci-fi', name: 'Sci-fi & Fantasy' },
  { id: 'video-game-characters', name: 'Video Game Characters' },
  { id: 'custom-fan-art', name: 'Custom Fan Art' }
];

  // Price ranges
  const priceRanges = [
    { id: 'under-249', name: 'Under ₹249', range: [0, 249] },
    { id: '249-499', name: '₹249 to ₹499', range: [249, 449] },
    { id: '499-749', name: '₹499 to ₹749', range: [449, 749] },
    { id: 'over-1000', name: 'Over ₹1000', range: [1000, Infinity] }
  ];

  // Sort options
  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'top-rated', name: 'Top Rated' }
  ];

  useEffect(() => {
    // Simulate API call with loading state
    setLoading(true);
    
    // In real app, fetch from API based on filters
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      // Apply category filter
      if (selectedFilters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          selectedFilters.categories.includes(product.category)
        );
      }
      
      // Apply hero filter
      if (selectedFilters.hero.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          selectedFilters.hero.includes(product.hero)
        );
      }
      
      // Apply price filter
      if (selectedFilters.price) {
        const priceRange = priceRanges.find(range => range.id === selectedFilters.price);
        if (priceRange) {
          filteredProducts = filteredProducts.filter(product => 
            product.price >= priceRange.range[0] && product.price <= priceRange.range[1]
          );
        }
      }
      
      // Apply sorting
      switch (selectedFilters.sort) {
        case 'newest':
          // In real app, would sort by date
          break;
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'top-rated':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Featured - default order
          break;
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [selectedFilters]);

  // Initialize filters from URL parameters on component mount
  useEffect(() => {
    if (category) {
      handleCategoryChange(category);
    }
    
    // Get other filters from URL params
    const priceParam = searchParams.get('price');
    const sortParam = searchParams.get('sort');
    const heroParam = searchParams.get('hero')?.split(',') || [];
    
    if (priceParam || sortParam || heroParam.length > 0) {
      setSelectedFilters(prev => ({
        ...prev,
        price: priceParam || prev.price,
        sort: sortParam || prev.sort,
        hero: heroParam.length > 0 ? heroParam : prev.hero
      }));
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (selectedFilters.price) {
      newParams.set('price', selectedFilters.price);
    }
    
    if (selectedFilters.sort && selectedFilters.sort !== 'featured') {
      newParams.set('sort', selectedFilters.sort);
    }
    
    if (selectedFilters.hero.length > 0) {
      newParams.set('hero', selectedFilters.hero.join(','));
    }
    
    setSearchParams(newParams);
  }, [selectedFilters, setSearchParams]);

  const handleCategoryChange = (categoryId) => {
    setSelectedFilters(prev => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      
      return {
        ...prev,
        categories
      };
    });
  };

  const handleHeroChange = (heroId) => {
    setSelectedFilters(prev => {
      const heroes = prev.hero.includes(heroId)
        ? prev.hero.filter(id => id !== heroId)
        : [...prev.hero, heroId];
      
      return {
        ...prev,
        hero: heroes
      };
    });
  };

  const handlePriceChange = (priceId) => {
    setSelectedFilters(prev => ({
      ...prev,
      price: prev.price === priceId ? '' : priceId
    }));
  };

  const handleSortChange = (sortId) => {
    setSelectedFilters(prev => ({
      ...prev,
      sort: sortId
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      price: '',
      sort: 'featured',
      hero: []
    });
  };

  // Gets display name of filter from its ID
  const getFilterName = (type, id) => {
    switch (type) {
      case 'category':
        return categories.find(cat => cat.id === id)?.name || id;
      case 'hero':
        return heroes.find(hero => hero.id === id)?.name || id;
      case 'price':
        return priceRanges.find(range => range.id === id)?.name || id;
      default:
        return id;
    }
  };

  // Calculate active filters for display
  const activeFilters = [
    ...selectedFilters.categories.map(id => ({ type: 'category', id })),
    ...selectedFilters.hero.map(id => ({ type: 'hero', id })),
    ...(selectedFilters.price ? [{ type: 'price', id: selectedFilters.price }] : [])
  ];

  return (
    <div className="bg-slate-950 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-slate-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Shop Marvel</h1>
          <p className="mt-2 text-gray-300">
            Unleash your inner hero with our exclusive Marvel-themed clothing collection
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} className="mr-2" />
            Filters
            <ChevronDown size={18} className="ml-2" />
          </button>
        </div>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Active Filters:</h3>
              <button 
                className="text-red-500 text-sm font-medium hover:text-red-600"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => {
                return (
                  <span
                  key={`${filter.type}-${filter.id}`}
                  className="inline-flex items-center py-1 px-3 rounded-full bg-slate-950 border border-gray-300 text-sm text-white"
                >
                
                    {getFilterName(filter.type, filter.id)}
                    <button
                      onClick={() => {
                        if (filter.type === 'category') handleCategoryChange(filter.id);
                        if (filter.type === 'hero') handleHeroChange(filter.id);
                        if (filter.type === 'price') handlePriceChange(filter.id);
                      } }
                      className="ml-1 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div 
            className={`lg:w-64 ${
              isFilterOpen ? 'block' : 'hidden'
            } lg:block bg-slate-950 p-4 rounded-lg shadow-sm sticky top-28 h-fit`}
          >
            <div className="mb-8">
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedFilters.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-white"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-white mb-4">Hero</h3>
              <div className="space-y-2">
                {heroes.map((hero) => (
                  <div key={hero.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`hero-${hero.id}`}
                      checked={selectedFilters.hero.includes(hero.id)}
                      onChange={() => handleHeroChange(hero.id)}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label 
                      htmlFor={`hero-${hero.id}`}
                      className="ml-2 text-white"
                    >
                      {hero.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-white mb-4">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${range.id}`}
                      name="price-range"
                      checked={selectedFilters.price === range.id}
                      onChange={() => handlePriceChange(range.id)}
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label 
                      htmlFor={`price-${range.id}`}
                      className="ml-2 text-white"
                    >
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort & Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-white">
                Showing {products.length} products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-white mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={selectedFilters.sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-md text-white py-1 pl-3 pr-8 bg-slate-950 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-300 h-64 w-full"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
                      <div className="h-8 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-white text-lg">No products match your filters.</p>
                    <button 
                      onClick={clearAllFilters}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-slate-950 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                        <div className="relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-64 object-cover"
                          />
                          {product.isNew && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                              New
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-white mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < Math.floor(product.rating) 
                                      ? "text-yellow-400" 
                                      : "text-gray-300"
                                  } ${
                                    i === Math.floor(product.rating) && product.rating % 1 !== 0
                                      ? "fill-current text-yellow-400" 
                                      : ""
                                  }`}
                                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">
                              ({product.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-red-600">
                            ₹{product.price.toFixed(2)}
                            </span>
                            <button className="bg-gray-900 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-300">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;