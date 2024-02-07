import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.scss";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <img src="../images/banner.png" className="banner" alt="SoGames" />
      <div className="navBar">
        <Link to="/">
          <div className="titulos">
            <h1>SoGames</h1>
            <h2>Tienda de Juegos de Mesa</h2>
          </div>
        </Link>
        <ul>
          <li>
            <NavLink to="/categoria/top10">Top 10</NavLink>
          </li>
          <li>
            <NavLink to="/categoria/tematicos">Temáticos</NavLink>
          </li>
          <li>
            <NavLink to="/categoria/party">Party</NavLink>
          </li>
          <li>
            <NavLink to="/categoria/estrategia">Estrategia</NavLink>
          </li>
          <li>
            <NavLink to="/categoria/familia">Familia</NavLink>
          </li>
        </ul>
        <Link to="/cart">
          <CartWidget />
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
