import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";

const Cart = () => {
  const { carrito, total, cantidadTotal, vaciarCarrito } =
    useContext(CarritoContext);

  if (cantidadTotal === 0) {
    return (
      <>
        <h2>Carrito</h2>
        <p>No hay productos en el carrito</p>
        <Link to="/" className="linkBoton">
          <button>Volver al inicio</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <h2>Carrito</h2>
      <hr />
      {carrito.map((prod) => (
        <CartItem key={prod.item.id} {...prod} />
      ))}
      <h4>Cantidad total de productos: {cantidadTotal}</h4>
      <h4>Total: ${total.toFixed(2)}</h4>
      <div className="linkBoton">
        <button onClick={() => vaciarCarrito()}>Vaciar Carrito</button>

        <Link to="/checkout" className="linkBoton">
          <button>Finalizar Compra</button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
