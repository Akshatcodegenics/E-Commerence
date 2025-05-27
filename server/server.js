import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// import

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Simple server without database
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
const testWishlist = [
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

// Basic API endpoint for testing
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// Test profile endpoints
app.get("/user_profile", (req, res) => {
  res.json(testUser);
});

app.get("/getAvatar", (req, res) => {
  res.json({ avatar: testUser.Avatar });
});

app.put("/update_user_profile", (req, res) => {
  const updatedData = req.body;

  // Update test user data (in memory)
  if (updatedData.Name) testUser.Name = updatedData.Name;
  if (updatedData.Email) testUser.Email = updatedData.Email;
  if (updatedData.PhoneNumber) testUser.PhoneNumber = updatedData.PhoneNumber;
  if (updatedData.addresses) testUser.addresses = updatedData.addresses;

  res.json(testUser);
});

app.patch("/avatar", (req, res) => {
  const { Avatar } = req.body;
  if (Avatar) {
    testUser.Avatar = Avatar;
  }
  res.json({ message: "Profile updated", user: testUser });
});

// Test orders endpoint
app.get("/api/orders", (req, res) => {
  res.json(testOrders);
});

// Test wishlist endpoint
app.get("/api/wishlist", (req, res) => {
  res.json(testWishlist);
});

// Add to wishlist
app.post("/api/wishlist", (req, res) => {
  const newItem = req.body;
  testWishlist.push({
    id: `PROD-${Date.now()}`,
    ...newItem
  });
  res.json({ message: "Item added to wishlist", wishlist: testWishlist });
});

// Remove from wishlist
app.delete("/api/wishlist/:id", (req, res) => {
  const { id } = req.params;
  const index = testWishlist.findIndex(item => item.id === id);
  if (index > -1) {
    testWishlist.splice(index, 1);
  }
  res.json({ message: "Item removed from wishlist", wishlist: testWishlist });
});