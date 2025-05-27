import { useState } from 'react';
import { Search, Calendar, Filter, Download, Eye, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data for orders
const orderData = [
  {
    id: "#ORD-5983",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    amount: "₹1,259.99",
    date: "2025-04-30",
    status: "Delivered",
    items: 3
  },
  {
    id: "#ORD-5982",
    customer: "Michael Chen",
    email: "mchen@example.com",
    amount: "₹849.99",
    date: "2025-04-30",
    status: "Processing",
    items: 2
  },
  {
    id: "#ORD-5981",
    customer: "Emily Williams",
    email: "emily.w@example.com", 
    amount: "₹379.99",
    date: "2025-04-29",
    status: "Shipped",
    items: 1
  },
  {
    id: "#ORD-5980",
    customer: "Robert Smith",
    email: "robert.s@example.com",
    amount: "₹1,639.99",
    date: "2025-04-29",
    status: "Pending",
    items: 4
  },
  {
    id: "#ORD-5979",
    customer: "Priya Sharma",
    email: "priya.s@example.com",
    amount: "₹729.99",
    date: "2025-04-28",
    status: "Delivered",
    items: 2
  },
  {
    id: "#ORD-5978",
    customer: "David Wilson",
    email: "david.w@example.com",
    amount: "₹1,899.99",
    date: "2025-04-28",
    status: "Cancelled",
    items: 5
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Delivered: "bg-green-500 text-white",
    Processing: "bg-blue-500 text-white",
    Shipped: "bg-purple-500 text-white",
    Pending: "bg-yellow-500 text-white",
    Cancelled: "bg-red-500 text-white"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default function AdminOrdersPanel() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Filter orders based on search and status
  const filteredOrders = orderData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto mt-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Orders Management</h1>
          <p className="text-gray-400 mb-15">Manage and process customer orders</p>
        </header>

        {/* Filters and actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative">
              <select 
                className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-2 px-4 text-white">
              <Calendar className="h-5 w-5" />
              <span>Date Range</span>
            </button>
            
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 text-white">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl mb-30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="py-4 px-6 font-medium">ORDER ID</th>
                  <th className="py-4 px-6 font-medium">CUSTOMER</th>
                  <th className="py-4 px-6 font-medium">ITEMS</th>
                  <th className="py-4 px-6 font-medium">AMOUNT</th>
                  <th className="py-4 px-6 font-medium">DATE</th>
                  <th className="py-4 px-6 font-medium">STATUS</th>
                  <th className="py-4 px-6 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/50">
                    <td className="py-4 px-6 font-medium">{order.id}</td>
                    <td className="py-4 px-6">
                      <div>{order.customer}</div>
                      <div className="text-sm text-gray-400">{order.email}</div>
                    </td>
                    <td className="py-4 px-6">{order.items} items</td>
                    <td className="py-4 px-6 font-medium">{order.amount}</td>
                    <td className="py-4 px-6">{order.date}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center bg-gray-800 px-6 py-4">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex gap-2 items-center">
              <button 
                className="p-1 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button 
                  key={index}
                  className={`h-8 w-8 rounded-md ${currentPage === index + 1 ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className="p-1 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}