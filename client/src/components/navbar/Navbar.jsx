import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/nav-logo.png" alt="" className="nav-logo" />
      <form className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Enter the channel name or url"
        />
        <button className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div className="nav-options">
        <NavLink className="nav-link" to="/" exact>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className="nav-link" id="login-btn" to="/auth">
          Login
        </NavLink>
      </div>
    </div>
  );
};
