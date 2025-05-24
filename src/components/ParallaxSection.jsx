import React, { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./ParallaxSection.css";
import RobotGallery from "./RobotGallery";
import FinalRoom from "./FinalRoom";

const ParallaxSection = () => {
  const parallaxRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      // Obtenemos el scroll actual del contenedor Parallax
      const scrollTop = parallaxRef.current.container.current.scrollTop;
      setScrollY(scrollTop);

      const pageHeight = window.innerHeight;
const currentPage = Math.round(scrollTop / pageHeight);
setPaginaActual(currentPage);

    };

    const container = parallaxRef.current?.container.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  // Calculamos translateY y opacity para el texto según scrollY
  const translateY = Math.min(scrollY * 1.6, 640);
  const opacity = Math.max(1 - scrollY / 700, 0);

  // Calcula desplazamiento horizontal para cada palabra
  const translateXLeft = Math.max(-scrollY * 0.4, -800);
  const translateXRight = Math.min(scrollY * 0.4, 800);

  // 🧠 Escala progresiva entre 1 y 1.5 cuando scrollY va de 0 a 1000
  const monsterScale = Math.min(1 + scrollY / 5000, 1.9);
  const monsterScale2 = Math.min(1 + scrollY / 5000, 2.0);

  // Puedes ajustar estos valores para moverlos más o menos
  const monsterTranslate1 = Math.min(scrollY * 0.1, 250);
  const section2Start = window.innerHeight * 1;
  const scrollYSection2 = Math.max(scrollY - section2Start, 0);

  const centauroTranslateY = Math.max(300 - scrollYSection2 * 0.5, 0);
  const centauroScale = 1 + Math.min(scrollYSection2 / 400, 1.5);
  const centauroBrightness = Math.min(1, 0.1 + scrollYSection2 / 600);

  const section3Start = window.innerHeight * 2;
  const scrollYSection3 = Math.max(scrollY - section3Start, 0);

  {
    /* 🌌 SECCION 1 - Imagen de la cueva detrás de los monstruos */
  }

  return (
    <div className="parallax-wrapper" style={{ height: "100vh" }}>
      <Parallax ref={parallaxRef} pages={4}>
        <ParallaxLayer offset={0} speed={0.2}>
          <img
            src="/img/nuevaimagenBack.png"
            className="layer-img"
            alt="Fondo"
          />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <div style={{ width: "100%", height: "100%" }} />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.8}>
          <img
            src="/img/nuevaimagenFrontSeccion1Sombra.png"
            className="layer-img"
            alt="Frente"
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            opacity: opacity,
            pointerEvents: "none",

            gap: "6rem",
            zIndex: 10, // ✨ Prioridad máxima
            position: "relative",
          }}
          className="neon-text"
        >
          <span
            style={{
              transform: `translateY(${translateY}px) translateX(${
                translateXLeft - 40
              }px)`,
              transition: "transform 0.1s",
              display: "inline-block",
            }}
          >
            FALLOUT
          </span>
          <span
            style={{
              transform: `translateY(${translateY}px) translateX(${translateXRight}px)`,
              transition: "transform 0.1s",
              display: "inline-block",
            }}
          >
            RADIO
          </span>
        </ParallaxLayer>

        {/* 🌌 SECCION 2 - Imagen de la cueva detrás de los monstruos */}

        <ParallaxLayer offset={1} speed={0.1} className="section-cueva">
          <ParallaxLayer offset={1} speed={0.1}>
            <div className="cueva-bg" />
          </ParallaxLayer>

          <img
            src="/img/Sanguinario2.png"
            className="monster-img"
            style={{
              position: "absolute",
              top: "75%",
              left: "-5%",
              width: "640px",
              transform: `translateX(${monsterTranslate1}px) scale(${monsterScale})`,
              transition: "transform 0.1s ease-out",
              pointerEvents: "auto", // IMPORTANTE
            }}
            alt="Elemento 1"
          />
          <img
            src="/img/mosca.png"
            className="monster-img"
            style={{
              position: "absolute",
              top: "45%",
              left: "40%",
              width: "350px",
              transform: `scale(${monsterScale2})`,
              transition: "transform 0.1s ease-out",
              pointerEvents: "auto", // IMPORTANTE
            }}
            alt="Elemento 2"
          />

          <img
            src="/img/centauro.png"
            className="monster-img"
            style={{
              position: "absolute",
              top: "85%",
              left: "78%",
              width: "400px",
              transform: `translateY(-${centauroTranslateY}px) scale(${centauroScale})`,
              filter: `brightness(${centauroBrightness})`,
              transition: "transform 0.1s ease-out",
              pointerEvents: "auto", // IMPORTANTE
            }}
            alt="Elemento 3"
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <div style={{ width: "100%", height: "100%" }} />
        </ParallaxLayer>

        {/* CAPA DELANTERA - con "agujeros" */}
        <ParallaxLayer offset={1} speed={0.8}>
          <img
            src="/img/Seccion2Sombra_Final.png"
            style={{
              width: "100vw",
              height: "240vh",
              objectFit: "cover",
            }}
            alt="Máscara frontal"
          />
        </ParallaxLayer>

        {/* 🌌 SECCION 4 - ROBOTS */}

        <ParallaxLayer offset={2} speed={0.5}>
          <RobotGallery scrollY={scrollYSection3} />
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.4} style={{ height: "150vh" }}>
          <FinalRoom />
        </ParallaxLayer>
      </Parallax>
    {paginaActual < 3 && (
  <div
    className="go-to-final"
    onClick={() => parallaxRef.current.scrollTo(3)}
  >
    Ir al final ↓
  </div>
)}


    </div>
  );
};

export default ParallaxSection;
