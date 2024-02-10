import React from "react";
import NavBar from "./componentes/NavBar/NavBar";
import Footer from "./componentes/Footer/Footer";
import Cart from "./componentes/Cart/Cart";
import Checkout from "./componentes/Checkout/Checkout";
import Orden from "./componentes/Orden/Orden";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import PaginaError from "./componentes/PaginaError/PaginaError";
import { ProveedorCarrito } from "./context/CarritoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="aplicacion">
        <BrowserRouter>
          <ProveedorCarrito>
            <NavBar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route
                path="/categoria/:idCategoria"
                element={<ItemListContainer />}
              />
              <Route path="/item/:idItem" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orden" element={<Orden />} />
              <Route path="*" element={<PaginaError />} />
            </Routes>
          </ProveedorCarrito>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
