import React, { useState } from 'react';
import { Package, Truck, RotateCcw, CheckCircle, AlertCircle, Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';

const Orders_Page = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock order data 
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      total: 9999,
      items: [
        { id: 1, name: 'Captain America Shield T-Shirt', price: 1999, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 2, name: 'Iron Man Arc Reactor Hoodie', price: 3499, quantity: 2, image: '/api/placeholder/80/80' }
      ],
      status: 'delivered',
      deliveredDate: '2023-05-20',
      trackingNumber: 'TRK-987654321'
    },
    {
      id: 'ORD-12346',
      date: '2023-06-02',
      total: 6499,
      items: [
        { id: 3, name: 'Thor Thunder Graphic Tee', price: 1999, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 4, name: 'Black Panther Jacket', price: 4499, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      status: 'dispatched',
      dispatchedDate: '2023-06-03',
      trackingNumber: 'TRK-987654322',
      estimatedDelivery: '2023-06-07'
    },
    {
      id: 'ORD-12347',
      date: '2023-06-10',
      total: 3499,
      items: [
        { id: 5, name: 'Hulk Graphic Sweatshirt', price: 3499, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      status: 'processing',
      estimatedDispatch: '2023-06-12'
    },
    {
      id: 'ORD-12348',
      date: '2023-05-25',
      total: 5499,
      items: [
        { id: 6, name: 'Spider-Man Web Slinger Tee', price: 1999, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 7, name: 'Venom Graphic Hoodie', price: 3499, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      status: 'returned',
      returnDate: '2023-06-05',
      returnReason: 'Wrong size',
      refundStatus: 'processed'
    },
    {
      id: 'ORD-12349',
      date: '2023-06-08',
      total: 11499,
      items: [
        { id: 8, name: 'Doctor Strange Mystic Arts Hoodie', price: 4499, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 9, name: 'Scarlet Witch Power Tee', price: 1999, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 10, name: 'Vision Synthezoid Tee', price: 1999, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 11, name: 'Wanda Vision Couple Tee', price: 2999, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      status: 'refund_generated',
      refundDate: '2023-06-15',
      refundAmount: 11499,
      refundMethod: 'Original payment method'
    }
  ];

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    // First apply status filter
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }

    // Then apply search filter if there is a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Get status icon and color based on order status
  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return {
          icon: <CheckCircle size={18} />,
          label: 'Delivered',
          color: 'text-green-500',
          bgColor: 'bg-green-900/50'
        };
      case 'dispatched':
        return {
          icon: <Truck size={18} />,
          label: 'Dispatched',
          color: 'text-blue-500',
          bgColor: 'bg-blue-900/50'
        };
      case 'processing':
        return {
          icon: <Clock size={18} />,
          label: 'Processing',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-900/50'
        };
      case 'returned':
        return {
          icon: <RotateCcw size={18} />,
          label: 'Returned',
          color: 'text-red-500',
          bgColor: 'bg-red-900/50'
        };
      case 'refund_generated':
        return {
          icon: <AlertCircle size={18} />,
          label: 'Refund Generated',
          color: 'text-purple-500',
          bgColor: 'bg-purple-900/50'
        };
      default:
        return {
          icon: <Package size={18} />,
          label: 'Unknown',
          color: 'text-gray-500',
          bgColor: 'bg-gray-800'
        };
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
            <p className="text-gray-300">
              View and track all your orders in one place
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-lime-200 bg-slate-800 border-gray-700 text-white"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'processing'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setActiveTab('dispatched')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'dispatched'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                Dispatched
              </button>
              <button
                onClick={() => setActiveTab('delivered')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'delivered'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setActiveTab('returned')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'returned'
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                Returned
              </button>
              <button
                onClick={() => setActiveTab('refund_generated')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'refund_generated'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800 text-white border-gray-700 hover:bg-slate-700'
                }`}
              >
                Refunded
              </button>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const isExpanded = expandedOrderId === order.id;

                return (
                  <div
                    key={order.id}
                    className="bg-slate-800 rounded-lg shadow-sm border-1 border-lime-200 overflow-hidden transition-all duration-300"
                  >
                    {/* Order Header */}
                    <div
                      className="p-4 cursor-pointer hover:bg-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-grow">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${statusInfo.bgColor}`}>
                            <span className={statusInfo.color}>{statusInfo.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{order.id}</h3>
                            <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
                          </div>
                        </div>

                        <div className="md:ml-auto flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-white">₹{order.total}</p>
                            <p className="text-sm text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                          </div>

                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </div>
                        </div>
                      </div>

                      <button className="text-gray-400">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {/* Order Details (Expanded) */}
                    {isExpanded && (
                      <div className="border-t border-gray-600 p-4">
                        {/* Order Items */}
                        <div className="mb-6">
                          <h4 className="font-medium text-white mb-3">Order Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-700 rounded overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <h5 className="font-medium text-white">{item.name}</h5>
                                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-white">₹{item.price}</p>
                                  <p className="text-sm text-gray-400">
                                    ₹{(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Status Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-slate-700 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Order Status</h4>
                            <div className="space-y-2">
                              {order.status === 'delivered' && (
                                <>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Delivered Date:</span>
                                    <span className="text-white">{formatDate(order.deliveredDate)}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Tracking Number:</span>
                                    <span className="text-white">{order.trackingNumber}</span>
                                  </p>
                                </>
                              )}

                              {order.status === 'dispatched' && (
                                <>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Dispatched Date:</span>
                                    <span className="text-white">{formatDate(order.dispatchedDate)}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Estimated Delivery:</span>
                                    <span className="text-white">{formatDate(order.estimatedDelivery)}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Tracking Number:</span>
                                    <span className="text-white">{order.trackingNumber}</span>
                                  </p>
                                </>
                              )}

                              {order.status === 'processing' && (
                                <p className="text-sm flex justify-between">
                                  <span className="text-gray-400">Estimated Dispatch:</span>
                                  <span className="text-white">{formatDate(order.estimatedDispatch)}</span>
                                </p>
                              )}

                              {order.status === 'returned' && (
                                <>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Return Date:</span>
                                    <span className="text-white">{formatDate(order.returnDate)}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Return Reason:</span>
                                    <span className="text-white">{order.returnReason}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Refund Status:</span>
                                    <span className="text-green-500">
                                      {order.refundStatus === 'processed' ? 'Processed' : 'Pending'}
                                    </span>
                                  </p>
                                </>
                              )}

                              {order.status === 'refund_generated' && (
                                <>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Refund Date:</span>
                                    <span className="text-white">{formatDate(order.refundDate)}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Refund Amount:</span>
                                    <span className="text-white">₹{order.refundAmount}</span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span className="text-gray-400">Refund Method:</span>
                                    <span className="text-white">{order.refundMethod}</span>
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="bg-slate-700 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Order Summary</h4>
                            <div className="space-y-2">
                              <p className="text-sm flex justify-between">
                                <span className="text-gray-400">Order Date:</span>
                                <span className="text-white">{formatDate(order.date)}</span>
                              </p>
                              <p className="text-sm flex justify-between">
                                <span className="text-gray-400">Order ID:</span>
                                <span className="text-white">{order.id}</span>
                              </p>
                              <p className="text-sm flex justify-between">
                                <span className="text-gray-400">Items:</span>
                                <span className="text-white">{order.items.length}</span>
                              </p>
                              <p className="text-sm flex justify-between font-medium">
                                <span className="text-gray-400">Total:</span>
                                <span className="text-white">₹{order.total}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 justify-end">
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                              Return Item
                            </button>
                          )}

                          {(order.status === 'dispatched' || order.status === 'delivered') && (
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                              Track Order
                            </button>
                          )}

                          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                            View Invoice
                          </button>

                          <button className="px-4 py-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg shadow-sm border border-gray-700 p-8 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No orders found</h3>
              <p className="text-gray-300 mb-6">
                {searchQuery
                  ? "No orders match your search criteria. Try a different search term."
                  : activeTab !== 'all'
                    ? `You don't have any ${getStatusInfo(activeTab).label.toLowerCase()} orders.`
                    : "You haven't placed any orders yet."}
              </p>
              {searchQuery || activeTab !== 'all' ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="px-4 py-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  View All Orders
                </button>
              ) : (
                <button
                  onClick={() => navigate('/shop')}
                  className="px-4 py-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Start Shopping
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders_Page;
