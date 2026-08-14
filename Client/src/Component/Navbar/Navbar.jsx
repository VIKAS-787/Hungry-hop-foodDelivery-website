import React, { useState } from "react";
import "./style.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { logo, search_icon, basket_icon, Bag_icon, Logout_icon, Profile_icon } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

function Navbar({setFormOpen}) {
  const [menu, setMenu] = useState("home");
  const {getCartTotalPrice, token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const LogoutHandel = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <Link to={'/'}><h1>HungryHop</h1></Link>
      </div>
      <ul className="nav-menu">
        <Link to={'/'}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a href="#appDownload"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="nav-right">
        <img src={search_icon} alt="search" className="search" />

        <div className="fix-basket">
          <Link to={'/cart'}><img src={basket_icon} alt="basket" /></Link>
          <div className={getCartTotalPrice() === 0?"": "dot"}></div>
        </div>
         {
          !token?<button onClick={()=>setFormOpen(true)}>Sign In</button>
          : <div className="navbar-profile">
            <img src={Profile_icon} alt="" />
            <ul className="nav-profile-bropdown">
              <li onClick={() => navigate("/myorders")}><img src={Bag_icon} alt="" /><p>Order</p></li>
              <hr />
              <li onClick={LogoutHandel}><img src={Logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
         }
      </div>
    </div>
  );
}

export default Navbar;
