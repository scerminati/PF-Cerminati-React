import React, { useState } from "react";
import "./Orden.scss";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/config";

const Orden = () => {
  const [ordenBuscada, setOrdenBuscada] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [hayOrden, setHayOrden] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (fecha) => {
    const date = new Date(fecha * 1000);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return (
      date.toLocaleDateString("es-ES", options) +
      " " +
      date.toLocaleTimeString("es-ES")
    );
  };

  const buscarOrden = async () => {
    try {
      const ordenDoc = await getDoc(doc(db, "ordenes", ordenBuscada));
      if (ordenDoc.exists()) {
        const OrdenBien = ordenDoc.data().items;
        setOrdenEncontrada(OrdenBien);
        const fecha = ordenDoc.data().fecha;
        const total = ordenDoc.data().total;
        setDetalles({ fecha, total });

        setError("");
        setHayOrden(true);
      } else {
        console.log("No se encontró la orden");
        setError("No se encontró la orden solicitada. Revisar el número.");
        setHayOrden(false);
      }
    } catch (error) {
      console.error("Error al buscar la orden:", error);
      setError("No se pudo buscar la orden, intentar nuevamente.");
      setHayOrden(false);
    }
  };

  return (
    <>
      <h2>Buscar una Orden de Compra</h2>
      <div className="ordenForm">
        <input
          type="text"
          value={ordenBuscada}
          onChange={(e) => setOrdenBuscada(e.target.value)}
        />
        <div className="linkBoton">
          <button onClick={buscarOrden}>Buscar Orden</button>
        </div>
      </div>
      {error ? (
        <div className="errorCheck">{error}</div>
      ) : (
        hayOrden && (
          <div class="detallesAdicc">
            <h3>Productos de la Orden {ordenBuscada}</h3>
            <p>
              <strong>Fecha: </strong>
              {formatDate(detalles.fecha.seconds)}
            </p>

            <div className="detalleItemsOrden">
              <div className="flex1">
                <strong>Producto</strong>
              </div>
              <div className="flex2">
                <strong>Cantidad</strong>
              </div>
            </div>
            <hr />
            {ordenEncontrada.map((detalle) => (
              <>
                <div key={detalle.id} className="detalleItemsOrden">
                  <div className="flex1">{detalle.nombre}</div>
                  <div className="flex2">{detalle.cantidad}</div>
                </div>
                <hr />
              </>
            ))}

            <p>
              <strong>Total a pagar:</strong> ${detalles.total.toFixed(2)}
            </p>
          </div>
        )
      )}
    </>
  );
};

export default Orden;
