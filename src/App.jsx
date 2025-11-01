import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";


export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            FlavorFind <span className="text-yellow-500">🍔</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-emerald-600">Home</Link></li>
            <li><Link to="/search" className="hover:text-emerald-600">Search</Link></li>
            <li><Link to="/favorites" className="hover:text-emerald-600">Favorites</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block h-0.5 bg-gray-800"></span>
            <span className="block h-0.5 bg-gray-800"></span>
            <span className="block h-0.5 bg-gray-800"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col items-center space-y-3 py-4 text-gray-700 font-medium">
              <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">Home</Link></li>
              <li><Link to="/search" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">Search</Link></li>
              <li><Link to="/favorites" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">Favorites</Link></li>
            </ul>
          </div>
        )}
      </nav>
      {/* Page Content */}
      <main className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}
