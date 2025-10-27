export default function Home() {
  return (
    <div className="pt-24 text-center">
      <h2 className="text-4xl font-bold text-emerald-600 mb-4">Welcome to FlavorFind 🍔</h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Discover delicious recipes from around the world. Search by ingredients or name and save your favorites!
      </p>
      <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-full text-lg hover:bg-emerald-700 transition-all">
          Start Searching 🔍
         </button>
    </div>
  );
}
