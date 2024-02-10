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

  const { agregoAlCarrito, carrito } = useContext(CarritoContext);

  const cantidadHandler = (cantidad) => {
    setCantidad(cantidad);
    const item = { id, nombre, precio, img };
    agregoAlCarrito(item, cantidad);
  };

  const yaExisteEnCarrito = carrito.find((prod) => prod.item.id === id);
  let stockAManejar;
  let indicadorLleno = false;
  if (yaExisteEnCarrito) {
    stockAManejar = stock - yaExisteEnCarrito.cantidad;
    if (stockAManejar == 0) {
      indicadorLleno = true;
    }
  } else {
    stockAManejar = stock;
  }

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

          {indicadorLleno ? (
            cantidad == 0 ? (
              <>
                <div className="alerta">
                  <p>
                    Este producto ya está en tu carrito con el máximo de
                    unidades.
                  </p>
                </div>
                <Link to="/cart" className="linkBoton">
                  <button>Terminar Compra</button>
                </Link>
              </>
            ) : (
              <Link to="/cart" className="linkBoton">
                <button>Terminar Compra</button>
              </Link>
            )
          ) : stock > 0 ? (
            cantidad > 0 ? (
              <Link to="/cart" className="linkBoton">
                <button>Terminar Compra</button>
              </Link>
            ) : (
              <ItemCount
                inicial={1}
                stock={stockAManejar}
                addToCart={cantidadHandler}
              />
            )
          ) : (
            <div className="alerta">
              <p>No tenemos stock disponible para comprar.</p>
            </div>
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
