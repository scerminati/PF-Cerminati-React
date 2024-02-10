import { useState, createContext } from "react";

export const CarritoContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0,
});

export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoLS = localStorage.getItem("carrito");
    return carritoLS ? JSON.parse(carritoLS) : [];
  });
  const [total, setTotal] = useState(() => {
    const totalLS = localStorage.getItem("total");
    return totalLS ? JSON.parse(totalLS) : 0;
  });
  const [cantidadTotal, setCantidadTotal] = useState(() => {
    const cantidadTotalLS = localStorage.getItem("cantidadTotal");
    return cantidadTotalLS ? JSON.parse(cantidadTotalLS) : 0;
  });

  const agregoAlCarrito = (item, cantidad) => {
    const productoExistente = carrito.find(
      (producto) => producto.item.id === item.id
    );

    if (!productoExistente) {
      const nuevoCarrito = [...carrito, { item, cantidad }];
      setCarrito(nuevoCarrito);
      setCantidadTotal((anterior) => anterior + cantidad);
      setTotal((anterior) => anterior + item.precio * cantidad);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      localStorage.setItem(
        "cantidadTotal",
        JSON.stringify(cantidadTotal + cantidad)
      );
      localStorage.setItem(
        "total",
        JSON.stringify(total + item.precio * cantidad)
      );
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
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
      localStorage.setItem(
        "cantidadTotal",
        JSON.stringify(cantidadTotal + cantidad)
      );
      localStorage.setItem(
        "total",
        JSON.stringify(total + item.precio * cantidad)
      );
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

    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    localStorage.setItem(
      "cantidadTotal",
      JSON.stringify(cantidadTotal - productoEliminado.cantidad)
    );
    localStorage.setItem(
      "total",
      JSON.stringify(
        total - productoEliminado.item.precio * productoEliminado.cantidad
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);

    localStorage.removeItem("carrito");
    localStorage.removeItem("total");
    localStorage.removeItem("cantidadTotal");
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
