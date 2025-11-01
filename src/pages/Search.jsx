import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8); // Pagination count

  // Fetch all categories
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error(err));
  }, []);

  // Fetch recipes by search or category
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let url = "";
      if (query.trim() !== "") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      } else if (selectedCategory) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
      }

      const res = await axios.get(url);
      setRecipes(res.data.meals || []);
      setVisibleCount(8); // Reset pagination on new search/filter
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch when category changes
  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">🔍 Search Recipes</h1>

        {/* Search + Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or ingredient..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={fetchRecipes}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="flex justify-center mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No recipes found 😢</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.slice(0, visibleCount).map((recipe) => (
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
                    <Link
                      to={`/recipe/${recipe.idMeal}`}
                      className="mt-2 inline-block bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < recipes.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition"
                >
                  Load More 🍽️
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
}
