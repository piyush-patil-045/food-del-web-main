import { useState, useContext } from "react";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin, setSearchQuery }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchVissible, setIsSearchVissible] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Handle search input change
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    setSearchQuery(query);
  };

  // Togle search input visibility
  const toggleSearch = () => {
    setIsSearchVissible(!isSearchVissible);
    if (!isSearchVissible) {
      setSearchInput("");
      setSearchQuery("");
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <img
            src={assets.search_icon}
            alt="Search Icon"
            onClick={toggleSearch}
            style={{ cursor: "pointer" }}
          />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchInput}
            onChange={handleSearchInput}
            onBlur={() => setIsSearchVissible(false)}
            className={isSearchVissible ? "show" : ""}
          />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
