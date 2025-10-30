import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(res.data.meals[0]);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // Check if recipe is already in favorites
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((r) => r.idMeal === id));
  }, [id]);

  // Toggle Favorite
  const handleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      savedFavorites = savedFavorites.filter((r) => r.idMeal !== id);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
      setIsFavorite(false);
    } else {
      savedFavorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return <p className="pt-24 text-center text-gray-500">Loading recipe...</p>;
  }

  if (!recipe) {
    return <p className="pt-24 text-center text-red-500">Recipe not found.</p>;
  }

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
  }

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      <Link
        to="/search"
        className="text-emerald-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Search
      </Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{recipe.strMeal}</h2>
            <button
              onClick={handleFavorite}
              className={`mt-3 sm:mt-0 px-5 py-2 rounded-full font-medium transition-all ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {isFavorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
            </button>
          </div>

          <p className="text-gray-600 mb-3">
            <span className="font-semibold">{recipe.strArea}</span> •{" "}
            {recipe.strCategory}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Instructions
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {recipe.strInstructions}
          </p>

          {recipe.strYoutube && (
            <div className="mt-6">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                ▶ Watch Tutorial on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
