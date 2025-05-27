# 🛒 E-Commerce Platform

A modern, full-stack e-commerce application built with React and Express.js, featuring a comprehensive multi-role system for customers, vendors, and administrators.

![E-Commerce Platform](https://img.shields.io/badge/React-18+-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5+-lightgrey.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 Features

### 👥 Multi-Role System
- **Customer Portal**: Browse products, manage cart, wishlist, and orders
- **Vendor Dashboard**: Product management, sales analytics, order processing
- **Admin Panel**: Complete platform management, user oversight, analytics

### 🛍️ Customer Features
- **Product Catalog**: Advanced search, filtering, and categorization
- **Shopping Cart**: Real-time cart management with quantity controls
- **Wishlist**: Save favorite products for later
- **User Profiles**: Avatar selection, address management, order history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🏪 Vendor Features
- **Product Management**: Add, edit, and manage product listings
- **Order Processing**: Track and manage customer orders
- **Sales Analytics**: Revenue tracking and performance metrics
- **Inventory Management**: Stock level monitoring and updates

### 🔧 Admin Features
- **User Management**: Customer and vendor account oversight
- **Product Oversight**: Platform-wide product management
- **Order Management**: System-wide order tracking and processing
- **Analytics Dashboard**: Comprehensive business intelligence

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple commands simultaneously
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Clone the Repository
```bash
git clone https://github.com/Akshatcodegenics/E-Commerence.git
cd E-Commerence
```

### Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Individual Commands
```bash
# Frontend only
npm run client

# Backend only
npm run start

# Build for production
npm run build
```

## 📁 Project Structure

```
E-Commerence/
├── public/                 # Static assets
│   ├── AdminPage/         # Admin-specific images
│   ├── CartPage/          # Cart-related images
│   ├── CollectionPage/    # Collection images
│   ├── HomePage/          # Homepage assets
│   ├── ProductPage/       # Product images
│   ├── ShopPage/          # Shop page assets
│   ├── WishlistPage/      # Wishlist images
│   └── avatars/           # User avatar options
├── server/                # Backend application
│   ├── package.json       # Server dependencies
│   ├── server.js          # Express server setup
│   └── passport.js        # Authentication config
├── src/                   # Frontend source code
│   ├── admin_pages/       # Admin panel components
│   ├── components/        # Reusable UI components
│   ├── connection_services/ # API service layer
│   ├── context/           # React context providers
│   ├── store/             # Redux store configuration
│   ├── user_pages/        # Customer-facing pages
│   ├── vendor_panel/      # Vendor dashboard components
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── database/              # Database schemas and services
├── package.json           # Root dependencies
└── README.md              # Project documentation
```

## 🎨 UI Components

### Custom Components
- **Background Boxes**: Animated background elements
- **Colorful Text**: Dynamic text styling
- **Loaders**: Custom loading animations
- **Notifications**: Toast-style notifications
- **Avatar Selection**: User profile customization

### Pages
- **Landing Page**: Welcome and navigation
- **Product Catalog**: Browse and search products
- **Shopping Cart**: Manage selected items
- **User Profile**: Account management
- **Admin Dashboard**: Platform administration
- **Vendor Panel**: Seller management tools

## 🔐 Authentication & Authorization

- **Multi-role Authentication**: Separate login flows for customers, vendors, and admins
- **Profile Management**: User avatar selection and profile customization
- **Session Management**: Secure user session handling
- **Route Protection**: Role-based access control

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop interface
- **Cross-Browser**: Compatible with modern browsers

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Akshatcodegenics**
- GitHub: [@Akshatcodegenics](https://github.com/Akshatcodegenics)
- Email: akshatr056@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS approach
- Express.js for the robust backend framework
- All the open-source contributors who made this project possible

---

⭐ **Star this repository if you found it helpful!**
