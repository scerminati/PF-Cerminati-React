import React from "react";
import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import "./Checkout.scss";

const Checkout = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } =
    useContext(CarritoContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [ordenId, setOrdenId] = useState("");
  const [error, setError] = useState("");

  const manejadorSubmit = (e) => {
    e.preventDefault();

    //Verificacion de completacion de campos

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completar todos los campos");
      return;
    }

    //Verificacion de correo
    if (email !== emailConfirmacion) {
      setError("Los emails no coinciden");
      return;
    }

    //Se crea objeto con datos de la orden

    const orden = {
      items: carrito.map((producto) => ({
        id: producto.item.id,
        nombre: producto.item.nombre,
        cantidad: producto.cantidad,
      })),
      total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    //Descuento de stock
    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, `productos/${productoOrden.id}`);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad,
        });
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            vaciarCarrito();
            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setEmailConfirmacion("");
            setError("");
          })
          .catch((error) => {
            console.log("Error al crear la orden de compra", error);
            setError("No se pudo crear la orden.");
          });
      })
      .catch((error) => {
        console.log("No se pudo actualizar el stock", error);
        setError("No se pudo actualizar el stock.");
      });

    //Se guarda en base de datos
  };

  return (
    <>
      <h2>Checkout</h2>
      {ordenId ? (
        <strong>Gracias por su compra, su número de Orden es {ordenId}</strong>
      ) : carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <p>Tu carrito tiene los siguientes productos:</p>
          <div className="contenedorCartItem">
            <div className="flex1">
              <p>Título</p>
            </div>

            <div className="flex2">
              <p>Cantidad</p>
            </div>
            <div className="flex3">
              <p>Precio</p>
            </div>
          </div>
          <hr />
          {carrito.map((producto) => (
            <>
              <div
                className="itemDetalleCheckout contenedorCartItem"
                key={producto.item.id}
              >
                <div className="flex1">
                  <p>{producto.item.nombre}</p>
                </div>
                <div className="flex2">
                  <p>{producto.cantidad}</p>
                </div>
                <div className="flex3">
                  <p>${producto.item.precio}</p>
                </div>
              </div>
              <hr />
            </>
          ))}
          <div className="itemDetalleCheckout  contenedorCartItem">
            <div className="flex1"></div>
            <div className="flex2">
              {" "}
              <p>Total de productos: {cantidadTotal}</p>
            </div>
            <div className="flex3">
              <p>Total de la compra: ${total}</p>
            </div>
          </div>
          <hr />
          <form className="formulario" onSubmit={manejadorSubmit}>
            <p>Por favor, completá tus datos para finalizar la compra.</p>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="emailConfirmacion">Confirmar Email</label>
              <input
                type="email"
                id="emailConfirmacion"
                onChange={(e) => setEmailConfirmacion(e.target.value)}
              />
            </div>
            {error && <p>{error}</p>}

            <div className="linkBoton">
              <button type="reset">Borrar</button>
              <button>Finalizar Orden</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Checkout;
