import "./CartWidget.scss";
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";

const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);

  return (
    <>
      <div className="carrito">
        <i className="bx bxs-cart"></i>
        {cantidadTotal > 0 && (
          <div className="notificacion">{cantidadTotal}</div>
        )}
      </div>
    </>
  );
};

export default CartWidget;
