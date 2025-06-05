import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar bg-primary px-3 custom-navbar">
      <Link className="navbar-brand text-white fs-4 brand-text" to="/">
        ☁️ WeatherNow
      </Link>
      <ul className="navbar-nav flex-row gap-3 nav-links">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
