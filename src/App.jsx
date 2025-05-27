import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Avatar_Page from './user_pages/Avatar_Page';
import { useEffect, useState } from 'react';
import Admin_Header from './components/Header/Admin_Header';
import Admin_Footer from './components/Footer/Admin_Footer';
import Vendor_Header from './components/Header/Vendor_Header';
import Vendor_Footer from './components/Footer/Vendor_Footer';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, []);


  const isAvatarPage = location.pathname === "/avatar";


  const isAdminLoginPage = location.pathname === "/admin_login";
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isVendorRoute = location.pathname.startsWith("/vendor");

  const isLandingPage = location.pathname === "/";

  return (
    <div
      className="w-full h-full dark:bg-dark-bg-primary dark:text-dark-text-primary transition-colors duration-300"
    >
      <div className="w-full text-center">


        {isLandingPage ? (
          <main><Outlet /></main>

        ) : isAvatarPage ? (
          <main><Avatar_Page /></main>

        // ) : isAdminLoginPage ? (
        //   <main><AdminLogin /></main>
        ) : isAdminRoute ? (
          <>
            <Admin_Header />
            <main><Outlet /></main>
            <Admin_Footer />
          </>
        ) : isVendorRoute ? (
          <>
            <Vendor_Header />
            <main><Outlet /></main>
            <Vendor_Footer />
          </>
        ) : (
          <>
            <Header />
            <main><Outlet /></main>
            <Footer />
          </>
        )}
      </div>
    </div>
)}

export default App;
