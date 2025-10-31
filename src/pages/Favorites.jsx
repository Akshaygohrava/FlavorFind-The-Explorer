import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((r) => r.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-600">
        <p className="text-2xl font-semibold mb-3">No favorites yet 💔</p>
        <Link to="/search" className="text-blue-500 hover:underline">
          Search some recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">❤️ Your Favorites</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-lg w-full h-48 object-cover"
            />
            <div className="mt-3 text-center">
              <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
              <div className="mt-2 flex justify-center gap-3">
                <Link
                  to={`/recipe/${recipe.idMeal}`}
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                >
                  View
                </Link>
                <button
                  onClick={() => removeFavorite(recipe.idMeal)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
