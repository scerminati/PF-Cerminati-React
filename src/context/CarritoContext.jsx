import { useState, createContext } from "react";

export const CarritoContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0,
});

export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  const agregoAlCarrito = (item, cantidad) => {
    const productoExistente = carrito.find(
      (producto) => producto.item.id === item.id
    );

    if (!productoExistente) {
      setCarrito((anterior) => [...anterior, { item, cantidad }]);
      setCantidadTotal((anterior) => anterior + cantidad);
      setTotal((anterior) => anterior + item.precio * cantidad);
    } else {
      const carritoActualizado = carrito.map((prod) => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad };
        } else {
          return prod;
        }
      });
      setCarrito(carritoActualizado);
      setCantidadTotal((anterior) => anterior + cantidad);
      setTotal((anterior) => anterior + item.precio * cantidad);
    }
  };

  const eliminarProducto = (id) => {
    const productoEliminado = carrito.find((prod) => prod.item.id === id);

    const carritoActualizado = carrito.filter((prod) => prod.item.id !== id);

    setCarrito(carritoActualizado);
    setCantidadTotal((anterior) => anterior - productoEliminado.cantidad);
    setTotal(
      (anterior) =>
        anterior - productoEliminado.item.precio * productoEliminado.cantidad
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        total,
        cantidadTotal,
        agregoAlCarrito,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
