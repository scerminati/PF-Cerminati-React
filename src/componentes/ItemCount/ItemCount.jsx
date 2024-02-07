import React from "react";
import { useState } from "react";
import "./ItemCount.scss";

const ItemCount = ({ inicial, stock, addToCart }) => {
  const [contador, setContador] = useState(inicial);

  const incrementar = () => {
    if (contador < stock) {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador > inicial) {
      setContador(contador - 1);
    }
  };

  return (
    <>
      <div className="carritoBotones linkBoton">
        <div className="botones">
          <button onClick={decrementar}>-</button> <p> {contador} </p>{" "}
          <button onClick={incrementar}>+</button>
        </div>
        <button onClick={() => addToCart(contador)}>Agregar al carrito</button>
      </div>
    </>
  );
};

export default ItemCount;
