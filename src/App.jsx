// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout      from "./components/Layout";
import Hero        from "./components/Hero";
import SpinnerPage from "./pages/SpinnerPage";
import TipsPage    from "./pages/TipsPage";
import AddTipPage  from "./pages/AddTipPage";
import About       from "./components/About";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home: show Hero + TipsPage + About */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main className="container mx-auto px-4 py-8 space-y-16">
                  <TipsPage />
                  <About />
                </main>
              </>
            }
          />

          {/* Spinner: header/footer come from Layout */}
          <Route
            path="/spinner"
            element={<SpinnerPage />}
          />

          {/* Add Tip: header/footer come from Layout */}
          <Route
            path="/add"
            element={
              <main className="container mx-auto px-4 py-8">
                <AddTipPage />
              </main>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
