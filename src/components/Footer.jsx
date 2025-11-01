export default function Footer() {
  return (
    <footer className="bg-white shadow-inner border-t border-gray-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        {/* Brand */}
        <h2 className="text-emerald-600 font-bold text-xl mb-2 md:mb-0">
          FlavorFind <span className="text-yellow-500">🍔</span>
        </h2>

        {/* Copyright */}
        <p className="text-gray-600 text-sm mb-3 md:mb-0">
          © {new Date().getFullYear()} FlavorFind. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/Akshaygohrava"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-emerald-600 transition text-lg"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/akshaygohrava/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-emerald-600 transition text-lg"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
