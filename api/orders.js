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
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    status: "Shipped",
    total: 124.99,
    items: [
      { name: "Thor Hammer Hoodie", quantity: 1, price: 64.99 },
      { name: "Captain America Shield Tee", quantity: 2, price: 30.00 }
    ]
  }
];

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      // Optional filtering by status
      if (query.status) {
        const filteredOrders = testOrders.filter(order => 
          order.status.toLowerCase() === query.status.toLowerCase()
        );
        res.status(200).json(filteredOrders);
      } else {
        res.status(200).json(testOrders);
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
