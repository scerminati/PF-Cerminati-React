import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { db } from "../../services/config";
import { collection, getDocs, where, query } from "firebase/firestore";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { idCategoria } = useParams();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const misProductos = idCategoria
      ? query(
          collection(db, "productos"),
          where("categoria", "array-contains", idCategoria)
        )
      : collection(db, "productos");
    getDocs(misProductos)
      .then((res) => {
        const nuevosProductos = res.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProductos(nuevosProductos);
        setLoader(true);
      })
      .catch((error) => console.log(error));
  }, [idCategoria]);

  const titulo = idCategoria
    ? `Categoría: Juegos ${idCategoria
        .charAt(0)
        .toUpperCase()}${idCategoria.slice(1)}`
    : "¡Bienvenido a la Tienda!";

  return (
    <>
      {loader ? (
        <div>
          <h2>{titulo}</h2>
          <ItemList productos={productos} />
        </div>
      ) : (
        <div className="widthPagina">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default ItemListContainer;
