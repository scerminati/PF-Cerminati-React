import React from "react";
import Item from "../Item/Item";
import "./ItemList.scss";

const ItemList = ({ productos }) => {


  return (
    <div className="productosCSS">
      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default ItemList;
