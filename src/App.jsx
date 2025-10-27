import { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-emerald-600">
            FlavorFind <span className="text-yellow-500">🍔</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li className="hover:text-emerald-600 cursor-pointer">Home</li>
            <li className="hover:text-emerald-600 cursor-pointer">Search</li>
            <li className="hover:text-emerald-600 cursor-pointer">Favorites</li>
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
              <li className="hover:text-emerald-600 cursor-pointer">Home</li>
              <li className="hover:text-emerald-600 cursor-pointer">Search</li>
              <li className="hover:text-emerald-600 cursor-pointer">Favorites</li>
            </ul>
          </div>
        )}
      </nav>

      {/* Home Section (just for layout preview) */}
      <main className="pt-24 flex flex-col items-center text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Discover Your Next Favorite Recipe 🍲
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Explore thousands of recipes from around the world with FlavorFind.
          Search by ingredients, save favorites, and start cooking delicious meals today!
        </p>

        <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-full text-lg hover:bg-emerald-700 transition-all">
          Start Searching 🔍
        </button>
      </main>
    </div>
  );
}
