import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Search, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

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

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
      };
      
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      
      if (selectedType) {
        params.type = selectedType;
      }
      
      const response = await axios.get('/api/products', { params });
      
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  // Mock data for display purposes only
  const mockProducts = [
    {
      _id: '1',
      name: 'Oversized Marvel Tee',
      type: 'Oversized',
      theme: 'Marvel Universe',
      price: 29.99,
      stockQuantity: 45,
      isActive: true,
      images: ['/api/placeholder/60/60']
    },
    {
      _id: '2',
      name: 'DC Comics Graphic Print',
      type: 'Graphic Printed',
      theme: 'DC Comics',
      price: 24.99,
      stockQuantity: 32,
      isActive: true,
      images: ['/api/placeholder/60/60']
    },
    {
      _id: '3',
      name: 'Anime Hero Sleeveless',
      type: 'Sleeveless',
      theme: 'Anime Superheroes',
      price: 19.99,
      stockQuantity: 0,
      isActive: false,
      images: ['/api/placeholder/60/60']
    },
    {
      _id: '4',
      name: 'Gaming Long Sleeve',
      type: 'Long Sleeve',
      theme: 'Video Game Characters',
      price: 34.99,
      stockQuantity: 12,
      isActive: true,
      images: ['/api/placeholder/60/60']
    }
  ];

    const displayProducts = Array.isArray(products) && products.length > 0 ? products : mockProducts;


  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-lg">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Products</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => fetchProducts()}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 transition-colors text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 p-6">
      <div className="max-w-full mx-auto mt-10 mb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <Link 
            to="/admin_products/new" 
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md text-white font-medium"
          >
            <PlusCircle size={18} />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-lg p-4 mb-12 mt-12">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All T-Shirt Types</option>
                {tShirtTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Comic Themes</option>
                {comicThemes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {/* {displayProducts.length === 0 ? ( */}
        {!Array.isArray(products) || displayProducts.length === 0 ? (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-300 mb-2">No products found</h2>
            <p className="text-gray-400 mb-6">Add your first product or try a different search.</p>
            <Link 
              to="/admin_products/new" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md text-white font-medium"
            >
              <PlusCircle size={18} />
              <span>Add New Product</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-800/80">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Theme</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {displayProducts.map(product => (
                    <tr key={product._id} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-700 flex items-center justify-center">
                        {Array.isArray(product?.images) && product.images.length > 0 ? (
                            <img 
                                src={product.images[0]} 
                                alt={product.name || 'Product'} 
                                className="w-full h-full object-cover" 
                            />
                            ) : (
                            <span className="text-xs text-gray-400">No image</span>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.theme}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`${product.stockQuantity === 0 ? 'text-red-400' : 'text-gray-300'}`}>
                          {product.stockQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          product.isActive 
                            ? 'bg-green-900/30 text-green-400 border border-green-800' 
                            : 'bg-red-900/30 text-red-400 border border-red-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/products/edit/${product._id}`} 
                            className="p-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded transition-colors"
                            title="Edit product"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-gray-800 py-3 px-6 border-t border-gray-700 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between sm:justify-end flex-1 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/30 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/30 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;