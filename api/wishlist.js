// Test wishlist data
let testWishlist = [
  {
    id: "PROD-001",
    name: "Captain America Shield Tee",
    price: 34.99,
    image: "/ProductPage/OversizedTee-1.webp",
    category: "T-Shirts",
    inStock: true
  },
  {
    id: "PROD-002",
    name: "Thor Hammer Hoodie",
    price: 64.99,
    image: "/ProductPage/OversizedTee-2.webp",
    category: "Hoodies",
    inStock: true
  },
  {
    id: "PROD-003",
    name: "Iron Man Arc Reactor Tee",
    price: 29.99,
    image: "/ProductPage/OversizedTee-3.webp",
    category: "T-Shirts",
    inStock: false
  }
];

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(testWishlist);
      break;
      
    case 'POST':
      const newItem = req.body;
      
      if (!newItem.name || !newItem.price) {
        return res.status(400).json({ error: 'Name and price are required' });
      }
      
      const wishlistItem = {
        id: `PROD-${Date.now()}`,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image || '/ProductPage/default.webp',
        category: newItem.category || 'Uncategorized',
        inStock: newItem.inStock !== undefined ? newItem.inStock : true,
        ...newItem
      };
      
      testWishlist.push(wishlistItem);
      res.status(201).json({ 
        message: "Item added to wishlist", 
        item: wishlistItem,
        wishlist: testWishlist 
      });
      break;
      
    case 'DELETE':
      const { id } = query;
      
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }
      
      const index = testWishlist.findIndex(item => item.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Item not found in wishlist' });
      }
      
      const removedItem = testWishlist.splice(index, 1)[0];
      res.status(200).json({ 
        message: "Item removed from wishlist", 
        removedItem,
        wishlist: testWishlist 
      });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
