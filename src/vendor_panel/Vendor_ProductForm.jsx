import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, X, Check } from 'lucide-react';

const ProductForm = () => {
  // Simulate being in edit mode with a mock ID
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    type: '',
    theme: '',
    stockQuantity: '',
    sizes: [],
    colors: [],
    images: [],
    isActive: true
  });

  const tShirtTypes = [
    'Oversized', 'Acid Wash', 'Graphic Printed', 'Solid Color', 
    'Polo T-Shirts', 'Sleeveless', 'Long Sleeve', 'Henley', 
    'Hooded', 'Crop Tops'
  ];

  const comicThemes = [
    'Marvel Universe', 'DC Comics', 'Anime Superheroes', 
    'Classic Comics', 'Sci-Fi & Fantasy', 'Video Game Characters', 
    'Custom Fan Art'
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const commonColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Grey', 'Navy', 'Purple'];

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [isEditMode]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Simulate API fetch with timeout
      setTimeout(() => {
        setFormData({
          name: 'Marvel Avengers T-Shirt',
          description: 'Official Marvel Avengers graphic t-shirt featuring the iconic superhero team in action. Made from 100% cotton for comfort and durability.',
          price: '29.99',
          salePrice: '24.99',
          type: 'Graphic Printed',
          theme: 'Marvel Universe',
          stockQuantity: '50',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Black', 'Navy', 'Red'],
          images: ['/api/placeholder/200/200', '/api/placeholder/200/200'],
          isActive: true
        });
        setLoading(false);
      }, 800);
      
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product data. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSizeToggle = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleColorToggle = (color) => {
    const updatedColors = formData.colors.includes(color)
      ? formData.colors.filter(c => c !== color)
      : [...formData.colors, color];
    
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleImageUpload = () => {
    // Simulate uploading images
    const newImages = [...formData.images, '/api/placeholder/200/200'];
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product saved:', formData);
      setSaving(false);
      // Navigate would happen here in the real app
    }, 1500);
  };

  // Sample data for demonstration
  useEffect(() => {
    // For demo purposes, populate the form with sample data
    if (!isEditMode) {
      setFormData({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        type: '',
        theme: '',
        stockQuantity: '',
        sizes: [],
        colors: [],
        images: [],
        isActive: true
      });
    }
  }, [isEditMode]);

  // Toggle edit mode for demo purposes
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-200 p-6 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-300">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-200 p-6 flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-lg">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Product</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => fetchProduct()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 transition-colors text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 p-6 mb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-14 gap-4 mt-8">
          <button 
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
            onClick={() => console.log('Navigate back')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
          
          {/* For demo purposes only - toggle between add/edit */}
          <button 
            onClick={toggleEditMode} 
            className="ml-auto text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-gray-300"
          >
            Demo: Toggle {isEditMode ? 'Add' : 'Edit'} Mode
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Product Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700">Product Information</h2>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Product Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter product name"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Enter product description"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                        Regular Price ($) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="salePrice" className="block text-sm font-medium text-gray-300 mb-1">
                        Sale Price ($)
                      </label>
                      <input
                        type="number"
                        id="salePrice"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                        T-Shirt Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select T-Shirt Type</option>
                        {tShirtTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">
                        Comic Theme <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Comic Theme</option>
                        {comicThemes.map(theme => (
                          <option key={theme} value={theme}>{theme}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-300 mb-1">
                      Stock Quantity <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="stockQuantity"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="Enter stock quantity"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        id="isActive" 
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`block h-6 rounded-full w-12 transition ${formData.isActive ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white rounded-full h-4 w-4 transition transform ${formData.isActive ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <label 
                      htmlFor="isActive" 
                      className="text-sm font-medium text-gray-300 cursor-pointer select-none"
                    >
                      Active (visible in store)
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Images Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700">Product Images</h2>
                
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex items-center justify-center gap-2 w-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 border border-dashed border-gray-500 rounded-lg p-4"
                  >
                    <Upload size={20} />
                    <span>Upload Images</span>
                  </button>

                  {formData.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden bg-gray-700 border border-gray-600">
                            <img 
                              src={imageUrl} 
                              alt={`Product ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg p-8 text-center">
                      <p className="text-gray-400">No images uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column - Sizes, Colors */}
            <div className="space-y-6">
              {/* Sizes Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700">Available Sizes</h2>
                
                <div className="grid grid-cols-3 gap-3">
                  {commonSizes.map(size => (
                    <div 
                      key={size} 
                      onClick={() => handleSizeToggle(size)}
                      className={`
                        flex items-center justify-center p-3 rounded cursor-pointer transition-colors
                        ${formData.sizes.includes(size) 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                      `}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700">Available Colors</h2>
                
                <div className="space-y-3">
                  {commonColors.map(color => (
                    <div 
                      key={color}
                      onClick={() => handleColorToggle(color)}
                      className={`
                        flex items-center gap-3 p-3 rounded cursor-pointer transition-colors
                        ${formData.colors.includes(color) 
                          ? 'bg-gray-700 border border-purple-500' 
                          : 'bg-gray-700 border border-gray-600 hover:border-gray-500'}
                      `}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-500"
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></div>
                      <span className="text-gray-300">{color}</span>
                      
                      {formData.colors.includes(color) && (
                        <Check size={16} className="ml-auto text-purple-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
            <button 
              type="button" 
              onClick={() => console.log('Navigate back')}
              className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:bg-purple-800/50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{isEditMode ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;