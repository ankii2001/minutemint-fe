// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header is assumed to be fixed-height (e.g., h-16) */}
      <Header />

      {/* 
        The padding-top here pushes content down below the header.
        Adjust 'pt-16' if your Header’s height differs.
      */}
      <div className="pt-19 flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}
