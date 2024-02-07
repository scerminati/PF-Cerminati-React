import { useState, useEffect } from "react";
import { db } from "../../services/config";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.scss";
import { getDoc, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [loader, setLoader] = useState(false);
  const { idItem } = useParams();
  useEffect(() => {
    const nuevoDoc = doc(db, "productos", idItem);
    getDoc(nuevoDoc)
      .then((res) => {
        const data = res.data();
        const nuevoProducto = { id: res.id, ...data };
        setProducto(nuevoProducto);
        setLoader(true);
      })
      .catch((error) => console.log(error));
  }, [idItem]);

  return (
    <>
      {loader ? (
        <div>
          <ItemDetail {...producto} />
        </div>
      ) : (
        <div className="widthPagina">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default ItemDetailContainer;
