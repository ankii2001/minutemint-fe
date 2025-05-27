import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header       from "./components/Header";
import Hero         from "./components/Hero";
import SpinnerPage  from "./pages/SpinnerPage";
import TipsPage     from "./pages/TipsPage";
import AddTipPage   from "./pages/AddTipPage";
import About        from "./components/About";
import Footer       from "./components/Footer";
import Loader       from "./components/Loader";

export default function App() {
  return (
    <BrowserRouter>
      <Loader />

      <Header />
      <Hero />

      <main className="min-h-screen bg-white transition-colors">
        <div className="container mx-auto px-4 py-8 space-y-16">
          <Routes>
            <Route path="/"    element={<SpinnerPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/add"  element={<AddTipPage />} />
          </Routes>
          <About />
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
