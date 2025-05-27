export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ 
      message: "E-Commerce API is running successfully!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
