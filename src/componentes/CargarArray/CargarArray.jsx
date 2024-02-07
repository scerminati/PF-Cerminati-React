import { useState, useEffect } from "react";
import { db } from "../../services/config";
import { collection, doc, setDoc } from "firebase/firestore";

const CargarArray = () => {
  useEffect(() => {
    const cargarData = async () => {
      try {
        const productos = [
          {
            id: 174430,
            nombre: "Gloomhaven",
            precio: 159.99,
            img: "../images/174430.webp",
            stock: 9,
            ano: 2017,
            minjug: 1,
            maxjug: 4,
            tiempo: 120,
            raiting: 8.79244,
            BGGrank: 1,
            complejidad: 3.8604,
            categoria: ["tematicos", "top10"],
            descripcion:
              "Gloomhaven es un juego de combate táctico con inspiración europea en un mundo persistente. Los jugadores, como aventureros, colaboran para limpiar mazmorras, mejorar habilidades y explorar en una historia que evoluciona según sus decisiones. El juego utiliza un sistema de cartas innovador para acciones, y los jugadores deben gestionar cuidadosamente sus recursos, ya que perderán cartas permanentemente, pudiendo agotarse si no completan los desafíos a tiempo.",
          },
          {
            id: 167791,
            nombre: "Terraforming Mars",
            precio: 65.9,
            img: "../images/167791.webp",
            stock: 5,
            ano: 2016,
            minjug: 1,
            maxjug: 5,
            tiempo: 120,
            raiting: 8.43254,
            BGGrank: 4,
            complejidad: 3.2406,
            categoria: ["estrategia", "top10"],
            descripcion:
              "En el siglo XXIV, la humanidad comienza a terraformar el planeta Marte. En el juego Terraforming Mars, interpretas el papel de una de las corporaciones patrocinadas por el Gobierno Mundial en la Tierra, compitiendo por puntos de victoria mientras colaboras en el proceso de terraformación. Adquieres cartas de proyectos únicos para mejorar tu producción de recursos y obtener bonificaciones, equilibrando la compra y la activación de cartas. Compites por ubicaciones estratégicas en el tablero y realizas acciones durante fases de generación, avanzando en la infraestructura humana en el sistema solar. El juego concluye cuando los parámetros globales (temperatura, oxígeno y océano) alcanzan sus objetivos, y el ganador se determina por la Puntuación de Terraformación y otros puntos de victoria acumulados.",
          },
          {
            id: 162886,
            nombre: "Spirit Island",
            precio: 70.99,
            img: "../images/162886.webp",
            stock: 9,
            ano: 2017,
            minjug: 1,
            maxjug: 4,
            tiempo: 120,
            raiting: 8.34655,
            BGGrank: 13,
            complejidad: 4.01,
            categoria: ["estrategia", "top10"],
            descripcion:
              "Spirit Island es un juego cooperativo donde los jugadores encarnan espíritus de la tierra con poderes elementales únicos, trabajando juntos para defender su isla de invasores colonizadores. Cada turno, los jugadores eligen estratégicamente cartas de poder, pagando energía para activar habilidades que varían en velocidad y efectividad. Mientras los espíritus crecen en poder y presencia, los invasores avanzan en la isla, construyendo asentamientos y ciudades. La victoria inicial requiere destruir todas las colonias, pero a medida que aterrorizas a los invasores, la victoria se facilita. Sin embargo, la derrota puede llegar si un espíritu es destruido, la corrupción invade la isla o la baraja de invasores se agota antes de lograr la victoria. Con adversarios variados, cada uno con desafíos únicos, Spirit Island ofrece una experiencia desafiante y temática.",
          },
          {
            id: 120677,
            nombre: "Terra Mystica",
            precio: 59.79,
            img: "../images/120677.webp",
            stock: 6,
            ano: 2012,
            minjug: 2,
            maxjug: 5,
            tiempo: 150,
            raiting: 8.14493,
            BGGrank: 16,
            complejidad: 3.964,
            categoria: ["estrategia", "top10"],
            descripcion:
              "En la tierra de Terra Mystica habitan 14 pueblos diferentes en siete paisajes, y cada grupo está vinculado a su propio entorno hogareño. Para desarrollarse y crecer, deben transformar paisajes vecinos en sus entornos hogareños en competencia con otros grupos. Terra Mystica es un juego de información completa, sin suerte, que recompensa la planificación estratégica. Cada jugador gobierna uno de los 14 grupos, y con sutileza y habilidad, debe tratar de gobernar la mayor área posible y desarrollar las habilidades de su grupo. Hay cuatro cultos religiosos en los que se puede progresar, y cada grupo tiene habilidades especiales. Durante los turnos, los jugadores ejecutan acciones en los recursos disponibles, desarrollan edificaciones y mejoran habilidades, como terraformación y navegación. La proximidad a otros grupos ofrece ventajas, pero también dificulta la expansión en Terra Mystica.",
          },
          {
            id: 266192,
            nombre: "Wingspan",
            precio: 47.69,
            img: "../images/266192.webp",
            stock: 5,
            ano: 2019,
            minjug: 1,
            maxjug: 5,
            tiempo: 70,
            raiting: 8.11403,
            BGGrank: 20,
            complejidad: 2.4194,
            categoria: ["familia", "top10"],
            descripcion:
              "Wingspan es un juego de mesa competitivo de construcción de motores impulsado por cartas, con un peso medio, desarrollado por Stonemaier Games y diseñado por Elizabeth Hargrave. Con más de 170 ilustraciones de aves de Beth Sobel, Natalia Rojas y Ana María Martínez, los jugadores, como entusiastas de las aves, buscan descubrir y atraer las mejores aves a sus reservas naturales. Cada ave permite crear potentes combinaciones en uno de los hábitats del jugador, centrándose en aspectos clave como obtener fichas de comida mediante dados en una torre de dados, poner huevos con miniaturas de huevos de colores y jugar cartas únicas de aves. El ganador es el jugador con más puntos después de 4 rondas.",
          },
          {
            id: 3076,
            nombre: "Puerto Rico",
            precio: 124.93,
            img: "../images/3076.webp",
            stock: 10,
            ano: 2002,
            minjug: 3,
            maxjug: 5,
            tiempo: 150,
            raiting: 7.98894,
            BGGrank: 28,
            complejidad: 3.2797,
            categoria: ["estrategia", "top10"],
            descripcion:
              "En Puerto Rico, los jugadores asumen el papel de gobernadores coloniales compitiendo por puntos de victoria mediante el envío de mercancías a Europa o la construcción de edificios. Cada jugador gestiona su propio tablero con ciudad, plantaciones y recursos, compartiendo barcos y una casa de comercio. Durante cada ronda, los jugadores eligen roles, como Comerciante o Constructor, realizando acciones asociadas, y el jugador que selecciona el rol obtiene un pequeño beneficio. El juego utiliza un mecanismo de orden de fase variable, y los jugadores ganan puntos por edificios, envíos y edificios grandes. Puerto Rico incorpora estrategia y toma de decisiones en un entorno colonial, con expansiones disponibles para agregar variedad al juego.",
          },
        ];

        const productosCollection = collection(db, "productos");

        productos.forEach(async (prod) => {
          const productoDoc = doc(productosCollection, prod.id.toString());
          await setDoc(productoDoc, prod);
        });
      } catch (error) {
        console.log((error) => console.log("me muero", error));
      }
    };

    cargarData();
  }, []);

  return <div>CargarArray</div>;
};

export default CargarArray;
