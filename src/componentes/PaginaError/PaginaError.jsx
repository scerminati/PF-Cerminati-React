import React from "react";
import "./PaginaError.scss";
import { Link } from "react-router-dom";

const PaginaError = () => {
  return (
    <>
      <Link to="/">
        <div className="errorStyle">
          <i className="bx bx-error"></i>
          <strong>Esta página no existe.</strong>
          <p>Vuelve a la página principal.</p>
          <h1>SoGames</h1>
        </div>
      </Link>
    </>
  );
};

export default PaginaError;
