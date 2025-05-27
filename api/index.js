import cors from 'cors';

// Test profile data
const testUser = {
  _id: "test-user-123",
  Name: "John Hero",
  Email: "john.hero@trendeclat.com",
  PhoneNumber: "+1 (555) 123-4567",
  Avatar: "avatar1.png",
  addresses: [
    {
      _id: "addr1",
      type: "Home",
      street: "123 Superhero Lane",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true
    },
    {
      _id: "addr2",
      type: "Work",
      street: "456 Marvel Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false
    }
  ]
};

// Test orders data
const testOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 89.99,
    items: [
      { name: "Iron Man Tech Tee", quantity: 1, price: 29.99 },
      { name: "Avengers Hoodie", quantity: 1, price: 59.99 }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "Processing",
    total: 45.99,
    items: [
      { name: "Spider-Man Web Tee", quantity: 1, price: 25.99 },
      { name: "Marvel Logo Cap", quantity: 1, price: 19.99 }
    ]
  }
];

// Test wishlist data
let testWishlist = [
  {
    id: "PROD-001",
    name: "Captain America Shield Tee",
    price: 34.99,
    image: "/ProductPage/OversizedTee-1.webp"
  },
  {
    id: "PROD-002",
    name: "Thor Hammer Hoodie",
    price: 64.99,
    image: "/ProductPage/OversizedTee-2.webp"
  }
];

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.vercel.app', 'https://e-commerence.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default async function handler(req, res) {
  // Apply CORS
  await new Promise((resolve, reject) => {
    cors(corsOptions)(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  const { method, url } = req;
  const path = url.split('?')[0];

  try {
    // Route handling
    if (path === '/api/test' && method === 'GET') {
      return res.json({ message: "Server is running successfully!" });
    }

    if (path === '/api/user_profile' && method === 'GET') {
      return res.json(testUser);
    }

    if (path === '/api/getAvatar' && method === 'GET') {
      return res.json({ avatar: testUser.Avatar });
    }

    if (path === '/api/update_user_profile' && method === 'PUT') {
      const updatedData = req.body;
      
      if (updatedData.Name) testUser.Name = updatedData.Name;
      if (updatedData.Email) testUser.Email = updatedData.Email;
      if (updatedData.PhoneNumber) testUser.PhoneNumber = updatedData.PhoneNumber;
      if (updatedData.addresses) testUser.addresses = updatedData.addresses;

      return res.json(testUser);
    }

    if (path === '/api/avatar' && method === 'PATCH') {
      const { Avatar } = req.body;
      if (Avatar) {
        testUser.Avatar = Avatar;
      }
      return res.json({ message: "Profile updated", user: testUser });
    }

    if (path === '/api/orders' && method === 'GET') {
      return res.json(testOrders);
    }

    if (path === '/api/wishlist' && method === 'GET') {
      return res.json(testWishlist);
    }

    if (path === '/api/wishlist' && method === 'POST') {
      const newItem = req.body;
      testWishlist.push({
        id: `PROD-${Date.now()}`,
        ...newItem
      });
      return res.json({ message: "Item added to wishlist", wishlist: testWishlist });
    }

    if (path.startsWith('/api/wishlist/') && method === 'DELETE') {
      const id = path.split('/').pop();
      const index = testWishlist.findIndex(item => item.id === id);
      if (index > -1) {
        testWishlist.splice(index, 1);
      }
      return res.json({ message: "Item removed from wishlist", wishlist: testWishlist });
    }

    // 404 for unmatched routes
    return res.status(404).json({ error: 'API endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
