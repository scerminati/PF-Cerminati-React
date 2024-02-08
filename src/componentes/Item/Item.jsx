import React from "react";
import "./Item.scss";
import { Link } from "react-router-dom";

const Item = ({
  id,
  nombre,
  precio,
  img,
  complejidad,
  tiempo,
  raiting,
  minjug,
  maxjug,
}) => {
  return (
    <div className="contenedorProducto">
      <h3>{nombre}</h3>
      <div className="imagen">
        <img src={img} alt={nombre} />
      </div>
      <div className="cajaDescripcion">
        <p>
          <i className="bx bx-compass"></i>Complejidad: {complejidad.toFixed(2)}
        </p>
        <p>
          <i className="bx bx-time-five"></i>Tiempo: {tiempo} min
        </p>
        <p>
          <i className="bx bx-star"></i>Raiting: {raiting.toFixed(2)}
        </p>
        <p>
          <i className="bx bx-game"></i>De {minjug} a {maxjug} jugadores
        </p>
      </div>
      <p>Precio: ${precio.toFixed(2)}</p>

      <Link to={`/item/${id}`} className="linkBoton">
        <button>Ver Detalles</button>
      </Link>
    </div>
  );
};

export default Item;
