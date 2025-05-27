// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight, ShoppingBag, CreditCard, TruckIcon } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Mock cart data (in a real app, this would come from a state management system or API)
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCartItems([
        {
          _id: 'ts12345',
          name: 'Essential Solid Crewneck',
          brand: 'StyleComfort',
          price: 249.99,
          salePrice: 199.99,
          onSale: true,
          color: 'Black',
          size: 'M',
          quantity: 2,
          image: './CartPage/SolidCrewNeck.jpg',
          inStock: true
        },
        {
          _id: 'ts67890',
          name: 'Graphic Print Street Art',
          brand: 'UrbanThreads',
          price: 279.99,
          salePrice: null,
          onSale: false,
          color: 'Light Brown',
          size: 'L',
          quantity: 1,
          image: './CartPage/GraphicPrintedTee.webp',
          inStock: true
        },
        {
          _id: 'ts24680',
          name: 'Vintage Acid Wash T-Shirt',
          brand: 'ActiveWear',
          price: 229.99,
          salePrice: 209.99,
          onSale: true,
          color: 'Gray',
          size: 'XL',
          quantity: 1,
          image: './CartPage/AcidWashTees.jpeg',
          inStock: true
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Cart calculations
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.onSale ? item.salePrice : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - discountAmount;

  // Item quantity handlers
  const incrementQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Promo code handlers
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      const discount = subtotal * 0.1; // 10% discount
      setDiscountAmount(discount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-white mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/product" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-slate-950 rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-slate-950 rounded-t-lg">
                <div className="flex font-medium text-white">
                  <div className="w-2/5">Product</div>
                  <div className="w-1/5 text-center">Price</div>
                  <div className="w-1/5 text-center">Quantity</div>
                  <div className="w-1/5 text-right">Total</div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-wrap md:flex-nowrap items-center">
                    <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 mr-4 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-white">
                          {item.brand} • {item.color} • Size {item.size}
                        </p>
                        <button 
                          onClick={() => removeItem(item._id)}
                          className="text-sm text-red-600 flex items-center mt-2"
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="w-1/3 md:w-1/5 text-center">
                      {item.onSale ? (
                        <div>
                          <span className="font-medium text-white">₹{item.salePrice.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through block">₹{item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-medium">₹{item.price.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="w-1/3 md:w-1/5">
                      <div className="flex border border-gray-300 rounded-md max-w-xs mx-auto">
                        <button
                          onClick={() => decrementQuantity(item._id)}
                          className="px-3 py-1 border-r border-gray-300"
                          disabled={item.quantity <= 1}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center focus:outline-none py-1"
                        />
                        <button
                          onClick={() => incrementQuantity(item._id)}
                          className="px-3 py-1 border-l border-gray-300"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="w-1/3 md:w-1/5 text-right font-medium">
                    ₹{((item.onSale ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-slate-950 rounded-b-lg">
                <Link 
                  to="/products" 
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-slate-950 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <div className="p-4 border-b border-gray-300 bg-slate-950 rounded-t-lg">
                <h2 className="font-bold text-lg">Order Summary</h2>
              </div>

              <div className="p-4">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white">Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span className="font-medium">₹{shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white">Estimated Tax</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                {!promoApplied && (
                  <div className="mb-6">
                    <div className="flex mb-1">
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-r-md"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-white">Try "SAVE10" for 10% off</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 rounded-md font-medium mb-3">
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-white flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <CreditCard size={16} className="mr-1" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center">
                    <TruckIcon size={16} className="mr-1" />
                    <span>Fast Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Viewed section could go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;