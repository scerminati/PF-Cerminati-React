import React, { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.scss";

const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);

  const handleEliminarProducto = () => {
    eliminarProducto(item.id); 
  };

  return (
    <>
      <div className="contenedorCartItem">
        <div className="flex1">
          <h3>{item.nombre}</h3>
          <p>Cantidad: {cantidad}</p>
          <p>Precio: ${item.precio.toFixed(2)}</p>
        </div>
        <div className="flex2">
          <img src={item.img} alt={item.nombre} />
        </div>
        <div className="flex3 linkBoton">
          <button onClick={handleEliminarProducto}>Eliminar producto</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
