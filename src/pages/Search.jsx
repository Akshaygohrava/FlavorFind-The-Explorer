import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Add this import at the top

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipes from TheMealDB API
  const fetchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (res.data.meals) {
        setRecipes(res.data.meals);
      } else {
        setError("No recipes found 😢");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      {/* Search Bar */}
      <form
        onSubmit={fetchRecipes}
        className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Search recipes by name or ingredient..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition"
        >
          Search 🔍
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">Loading recipes...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {/* Recipe Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {recipe.strMeal}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {recipe.strArea} • {recipe.strCategory}
              </p>
              <Link
  to={`/recipe/${recipe.idMeal}`}
  className="inline-block text-emerald-600 hover:underline font-medium"
>
  View Recipe →
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
