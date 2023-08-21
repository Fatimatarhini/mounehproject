import React, { useState } from "react";
import "./Navbar.css";
import { NavLink,useLocation  } from "react-router-dom";
import MounehLogo from "../../images/Mouneh-logo.png";
import DropDown from "../DROPDOWN/Dropdown";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const isProductPage = location.pathname.startsWith("/product/");
  const isProductsPage = location.pathname.startsWith("/showProducts");
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("access_token");



  const menuOnClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div id="menu">
        <div
          id="menu-bar"
          onClick={menuOnClick}
          className={isMenuOpen ? "change" : ""}
        >
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <nav className={isMenuOpen ? "nav change" : "nav"} id="nav">
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            {isAdmin === "true" && (
              <li>
              <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>
            </li>
            )}
            <li>
            <NavLink to="/workshops" onClick={closeMenu}>
                Workshop
              </NavLink>
            </li>
            {isAdmin === "false" && (
              <li>
              <NavLink to="/MyProducts" onClick={closeMenu}>
              My Product
            </NavLink>
            </li>
            )}
            {isAdmin === "false" && (
              <li>
              <NavLink to="/addproduct" onClick={closeMenu}>
              Add Product
            </NavLink>
            </li>
            )}
            <li>
            {isProductPage && <NavLink to="/cart">My Cart</NavLink>}
            {!isProductPage && <NavLink to="/editprofile">Edit Profile</NavLink>}
            </li>
            {token && (
              <li><NavLink to="/mychat">My Chats</NavLink></li>
            )}
            <li>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={closeMenu}>
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={isMenuOpen ? "menu-bg change-bg" : "menu-bg"}
        id="menu-bg"
      ></div>

      <nav className="navbar">
        <div className="logo">
          <img src={MounehLogo} alt="" />
        </div>
        <ul className="navbar-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <DropDown />
          </li>
        </ul>
        <div className="authentication-btn">
            
          {isProductsPage && <NavLink to="/cart">My Cart</NavLink>}
          {isProductPage && <NavLink to="/cart">My Cart</NavLink>}
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
