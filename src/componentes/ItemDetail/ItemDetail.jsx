import React from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.scss";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";

const ItemDetail = ({
  id,
  ano,
  nombre,
  precio,
  img,
  complejidad,
  tiempo,
  raiting,
  minjug,
  maxjug,
  descripcion,
  stock,
}) => {
  const [cantidad, setCantidad] = useState(0);

  const { agregoAlCarrito } = useContext(CarritoContext);

  const cantidadHandler = (cantidad) => {
    setCantidad(cantidad);
    const item = { id, nombre, precio, img };
    agregoAlCarrito(item, cantidad);
  };

  return (
    <>
      <div className="detalle">
        <div className="textoDetalle">
          <h2>{nombre}</h2>
          <p>
            <strong>Descripción del juego:</strong>
          </p>
          <p>{descripcion}</p>
          <p>
            <strong>Año de Publicación:</strong> {ano}
          </p>
          <p>
            <strong>Complejidad:</strong> {complejidad.toFixed(2)}
          </p>
          <p>
            <strong>Tiempo de juego:</strong> {tiempo} min
          </p>
          <p>
            <strong>Raiting:</strong> {raiting.toFixed(2)}
          </p>
          <p>
            <strong>Número de jugadores:</strong> De {minjug} a {maxjug}.
          </p>
          <p>
            <strong>Precio:</strong> ${precio.toFixed(2)}
          </p>
          <p>
            <strong>Stock disponible:</strong> {stock}
          </p>

          {cantidad > 0 ? (
            <Link to="/cart" className="linkBoton">
              <button>Terminar Compra</button>
            </Link>
          ) : (
            <ItemCount inicial={1} stock={stock} addToCart={cantidadHandler} />
          )}
        </div>
        <div>
          <img src={img} alt={nombre} />
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
