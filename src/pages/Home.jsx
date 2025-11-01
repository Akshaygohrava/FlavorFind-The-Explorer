import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-4">
        🍔 FlavorFind
      </h1>

      <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">
        Discover mouth-watering recipes from around the world.  
        Search, explore, and save your favorites — all in one place!
      </p>

      <Link
        to="/search"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
      >
        🔍 Start Searching
      </Link>

      <img
        src="https://img.freepik.com/free-vector/flat-design-food-background_23-2149158783.jpg"
        alt="Delicious food"
        className="w-full max-w-md mt-10 rounded-2xl shadow-lg"
      />
    </div>
    </PageWrapper>
  );
}
