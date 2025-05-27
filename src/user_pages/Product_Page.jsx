import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [visibleReviews, setVisibleReviews] = useState(5);

  // Mock product data (in a real app, this would come from MongoDB via API)
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProduct({
        id: 'ts12345',
        name: 'Marvel Universe Oversized T-Shirts',
        brand: 'StyleComfort',
        price: 329.99,
        salePrice: 264.99,
        onSale: true,
        discount: 20,
        rating: 4.7,
        reviewCount: 26,
        description:
          "Experience ultimate comfort with our premium cotton crew neck t-shirt. Crafted from 100% organic cotton, this t-shirt combines sustainability with superior softness for an unmatched wearing experience. Designed with a classic fit, it effortlessly complements any outfit—whether you're dressing up for a casual day out or lounging at home.The breathable, lightweight fabric keeps you cool and comfortable throughout the day, while the reinforced crew neck collar retains its shape wash after wash. With its clean design and timeless appeal, this t-shirt is a wardrobe essential you'll reach for again and again.",
        features: [
          'Made from 100% organic cotton',
          'Classic regular fit',
          'Reinforced collar prevents stretching',
          'Pre-shrunk fabric',
          'Machine washable'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Navy', 'Gray', 'Red'],
        inStock: true,
        stockQuantity: 150,
        images: [
          './ProductPage/OversizedTee.webp',
          './ProductPage/OversizedTee-1.webp',
          './ProductPage/OversizedTee-2.webp',
          './ProductPage/OversizedTee-3.webp',
          './ProductPage/OversizedTee-4.webp',
          './ProductPage/OversizedTee-5.webp',
          './ProductPage/OversizedTee-6.webp',
          './ProductPage/OversizedTee-7.webp',
        ],
        deliveryInfo: 'Free delivery on orders over ₹199',
        returnPolicy: '30-day easy returns',
        tags: ['t-shirt', 'men', 'cotton', 'casual', 'crew neck']
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const mockReviews = Array.from({ length: 26 }, (_, i) => ({
    id: i + 1,
    user: `User${i + 1}`,
    comment: `This is review #${i + 1}. Great product!`,
    rating: Math.floor(Math.random() * 2) + 4 
  }));
    

    {/* Recommended T-Shirts */}
  const recommendedProducts = [
    {
      id: 1,
      name: "Anime Superheroes T-Shirt",
      price: 499,
      image: "./ProductPage/AnimeTees.webp",
    },
    {
      id: 2,
      name: "Classic Hooded T-Shirts",
      price: 699,
      image: "./ProductPage/HoodedTees.webp",
    },
    {
      id: 3,
      name: "Long Sleeve T-Shirts",
      price: 599,
      image: "./ProductPage/LongSleeveTees.webp",
    },
    {
      id: 4,
      name: "Video Game Characters T-Shirts",
      price: 349,
      image: "./ProductPage/VideoGameTees.jpeg",
    },
  ];
  

  return (
    <div className=" bg-slate-950 w-full mx-auto px-15 py-8">

      { (loading || !product) ? (
        <Loader/>
          ) :  (
      <>
      <div className="flex flex-col  lg:flex-row gap-8 mt-10 mb-10">
        {/* Product Image Slider */}
        <div className="lg:w-1/2">
          <div className="relative bg-gray-100 rounded-lg mb-14">
            <img 
              src={product.images[currentImageIndex]} 
              alt={`${product.name} view ${currentImageIndex + 1}`}
              className="w-full h-96 object-contain rounded-lg"
            />
            
            {/* Navigation arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-950 rounded-full p-2 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-950 rounded-full p-2 shadow-md"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Thumbnail navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button 
                key={index} 
                onClick={() => selectImage(index)}
                className={`w-16 h-16 border-2 rounded ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-400 mb-2">by {product.brand}</p>
            
            {/* Ratings */}
            <div className="flex items-center mb-4 justify-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    strokeWidth={i < Math.floor(product.rating) ? 0 : 1}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
          
        <div className='flex flex-col justify-center items-center mt-8'>
          {/* Price */}
          <div className="mb-6">
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-red-600">₹{product.salePrice.toFixed(2)}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-700 px-2 rounded-md font-medium">
                  Save {product.discount}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <p className="font-medium mb-2">Color: <span className="font-normal">{selectedColor}</span></p>
            <div className="flex gap-2">
              {product.colors.map(color => {
                const colorMap = {
                  'Black': 'bg-black',
                  'White': 'bg-white border border-gray-300',
                  'Navy': 'bg-blue-900',
                  'Gray': 'bg-gray-500',
                  'Red': 'bg-red-600'
                };
                
                return (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${colorMap[color]} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    aria-label={color}
                    onClick={() => setSelectedColor(color)}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="font-medium mb-2">Size: <span className="font-normal">{selectedSize}</span></p>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`w-10 h-10 border rounded-md flex items-center justify-center
                    ${selectedSize === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:border-gray-400'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex border border-gray-300 rounded-md max-w-xs">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 border-r border-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value, 10) || 1, product.stockQuantity))}
                className="w-16 text-center focus:outline-none py-2"
              />
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <p className="text-lime-300 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-lime-400 rounded-full"></span>
                In Stock ({product.stockQuantity} available)
              </p>
            ) : (
              <p className="text-red-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    
      <div className='flex gap-x-8 gap-y-6'>
         {/* Delivery Info */}
         <div className="mb-6 p-4 lg:w-1/2 bg-slate-800 border border-lime-200 rounded-md">
            <p className="font-medium text-2xl mb-5">Delivery & Returns</p>
            <p className="text-lg mb-1"><span className="font-medium">Delivery:</span> {product.deliveryInfo}</p>
            <p className="text-lg"><span className="font-medium">Returns:</span> {product.returnPolicy}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6 lg:w-1/2">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 px-6 rounded-md flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Add to Cart
            </button>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md">
            Buy Now
            </button>
            
            <button className="border border-gray-300 hover:border-gray-400 py-2 px-6 rounded-md flex items-center justify-center gap-2">
            <Heart size={20} />
            Add to Wishlist
            </button>
        </div>
    </div>

         {/* Recommended Section */}
           <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recommended T-Shirts</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((item) => (
             <div key={item.id} className="bg-slate-950 p-4 rounded shadow text-white">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2 rounded" />
             <h3 className="font-semibold">{item.name}</h3>
               <p className="text-white">₹{item.price}</p>
         </div>
       ))}
    </div>
    </div>

      {/* Product Description & Details */}
      <div className="mt-12 mb-12">
        <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
                {['description', 'features', 'reviews'].map(tab => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium transition-all ${
                    activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                >
                {tab === 'description' && 'Description'}
                {tab === 'features' && 'Features'}
                {tab === 'reviews' && `Reviews (${product.reviewCount})`}
                </button>
            ))}
            </nav>
        </div>

        <div className="flex flex-col items-start py-6">
            {activeTab === 'description' && (
                <>
                <h2 className="text-xl font-semibold mb-4">Product Description</h2>
                <p className="text-gray-300 text-lg mb-4 text-start">{product.description}</p>
                </>
            )}

            {activeTab === 'features' && (
                <>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 text-start">{feature}</li>
                    ))}
                </ul>
                </>
            )}

            {activeTab === 'reviews' && (
                <>
                <h3 className="text-xl font-semibold mb-4">Top Reviews</h3>
                <div className="space-y-4 w-full">
                    {mockReviews.slice(0, visibleReviews).map((review) => (
                    <div key={review.id} className="p-4 border border-gray-800 rounded-md bg-slate-900">
                        <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{review.user}</span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < review.rating ? "currentColor" : "none"}
                                strokeWidth={i < review.rating ? 0 : 1}
                            />
                            ))}
                        </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                    </div>
                    ))}

                    {visibleReviews < mockReviews.length && (
                    <button
                        onClick={() => setVisibleReviews((prev) => prev + 5)}
                        className="mt-4 text-blue-500 hover:underline"
                    >
                        View More
                    </button>
                    )}

                </div>
                </>
            )}

            
        </div>
      </div>
    </>
  )}
    </div>
  );
};

export default ProductPage;