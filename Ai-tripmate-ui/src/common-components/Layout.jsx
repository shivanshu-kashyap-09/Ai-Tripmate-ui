import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Outlet renders child routes dynamically

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet /> {/* This will render the current page's content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;