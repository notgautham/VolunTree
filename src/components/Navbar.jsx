import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">VolunTree</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/developers">Developers</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="nav-buttons">
        <Link to="/signup" className="btn-signup">Signup</Link>
        <Link to="/login" className="btn-login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
