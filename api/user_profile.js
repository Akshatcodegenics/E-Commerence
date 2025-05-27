// Test profile data
let testUser = {
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

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(testUser);
      break;

    case 'PUT':
      const updatedData = req.body;

      if (updatedData.Name) testUser.Name = updatedData.Name;
      if (updatedData.Email) testUser.Email = updatedData.Email;
      if (updatedData.PhoneNumber) testUser.PhoneNumber = updatedData.PhoneNumber;
      if (updatedData.addresses) testUser.addresses = updatedData.addresses;

      res.status(200).json(testUser);
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};
