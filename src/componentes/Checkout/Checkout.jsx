import React from "react";
import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, setDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
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

  const generarOrderId = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hour = String(fecha.getHours()).padStart(2, "0");
    const minute = String(fecha.getMinutes()).padStart(2, "0");
    const second = String(fecha.getSeconds()).padStart(2, "0");
    const randomNum = String(Math.floor(Math.random() * 10000)).padStart(
      4,
      "0"
    );

    const orderId = parseInt(
      `${year}${month}${day}${hour}${minute}${second}${randomNum}`
    );
    return orderId;
  };

  const manejadorSubmit = (e) => {
    e.preventDefault();

    //Verificacion de completacion de campos

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completar todos los campos.");
      return;
    }

    //Verificacion de correo
    if (email !== emailConfirmacion) {
      setError("Los emails no coinciden, revisar los datos completados.");
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
        const ordenesCollectionRef = collection(db, "ordenes");
        const orderIdGen = generarOrderId().toString(); // Generar ID único según tu lógica

        // Crear una referencia al documento con el ID generado
        const ordenDocRef = doc(ordenesCollectionRef, orderIdGen);

        setDoc(ordenDocRef, orden)
          .then(() => {
            setOrdenId(orderIdGen);
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
        <>
          <p>Gracias por su compra, su número de Orden es {ordenId}.</p>{" "}
          <Link to="/" className="linkBoton">
            <button>Volver a página inicial</button>
          </Link>
        </>
      ) : carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <p>Tu carrito tiene los siguientes productos:</p>
          <div className="contenedorCartItem">
            <div className="flex1">
              <strong>Título</strong>
            </div>

            <div className="flex2">
              <strong>Cantidad</strong>
            </div>
            <div className="flex3">
              <strong>Precio</strong>
            </div>
          </div>
          <hr />
          {carrito.map((producto) => (
            <React.Fragment key={producto.item.id}>
              <div className="itemDetalleCheckout contenedorCartItem">
                <div className="flex1">
                  <p>{producto.item.nombre}</p>
                </div>
                <div className="flex2">
                  <p>{producto.cantidad}</p>
                </div>
                <div className="flex3">
                  <p>${producto.item.precio.toFixed(2)}</p>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
          <div className="itemDetalleCheckout  contenedorCartItem">
            <div className="flex1"></div>
            <div className="flex2">
              <strong>Total de productos</strong>
              <p>{cantidadTotal}</p>
            </div>
            <div className="flex3">
              <strong>Total de la compra</strong>
              <p>${total.toFixed(2)}</p>
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
                onChange={(e) => {
                  setNombre(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                onChange={(e) => {
                  setApellido(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                onChange={(e) => {
                  setTelefono(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label htmlFor="emailConfirmacion">Confirmar Email</label>
              <input
                type="email"
                id="emailConfirmacion"
                onChange={(e) => {
                  setEmailConfirmacion(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="linkBoton">
              <button type="reset">Borrar</button>
              <button>Finalizar Orden</button>
            </div>
            {error && (
              <div className="errorCheck">
                <p>{error}</p>
              </div>
            )}
          </form>
        </>
      )}
    </>
  );
};

export default Checkout;
