import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="flex max-w-7xl flex-col items-center justify-between gap-4 py-4 sm:flex-row">
        <Link
          to="/"
          className="text-3xl px-4 font-bold text-white no-underline hover:text-blue-200"
        >
          ☁️ WeatherNow
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/"
              className="text-xl text-white no-underline hover:text-blue-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="text-xl text-white no-underline hover:text-blue-200"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="text-xl text-white no-underline hover:text-blue-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}