import React from "react";
import "./PaginaError.scss";

const PaginaError = () => {
  return (
    <>
      <div className="errorStyle">
        <i class="bx bx-error"></i>
        <strong>Página Equivocada.</strong>
        <p>Vuelve a la página principal.</p>
        <h1>SoGames</h1>
      </div>
    </>
  );
};

export default PaginaError;
