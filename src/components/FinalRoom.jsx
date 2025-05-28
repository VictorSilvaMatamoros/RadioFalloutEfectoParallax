// src/components/FinalRoom.jsx
import React, { useState } from "react";
import "./FinalRoom.css";
import LogicaReproductor from "./LogicaReproductor";
import RadioPlayer from "./RadioPlayer";
import ReproductorFavoritos from "./ReproductorFavoritos";
const FinalRoom = ({ onRestart }) => {

  const [mostrarPipBoy, setMostrarPipBoy] = useState(false);
  const [mostrarRadio, setMostrarRadio] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="final-room">
      <img src="/img/Habitacion.jpg" alt="Habitación" className="room-bg" />

      <img
        src="/img/radio.png"
        alt="Radio"
        className="interactive-object radio"
        onClick={() => setMostrarRadio(true)}
      />

      {!mostrarPipBoy && (
        <img
          src="/img/PipBoy_Reposo.png"
          alt="Pip-Boy"
          className="interactive-object pipboy"
          onClick={() => setMostrarPipBoy(true)}
        />
      )}

      {mostrarPipBoy && <div className="filtro-blur" />}
      {mostrarPipBoy && (
        <div className="pipboy-contenedor">
          <LogicaReproductor onClose={() => setMostrarPipBoy(false)} />
        </div>
      )}

      {mostrarRadio && (
        <div className="radio-player-contenedor">
          <RadioPlayer onClose={() => setMostrarRadio(false)} />
        </div>
      )}

      <img
        src="/img/Mr.Mañoso.png"
        alt="Mr. Mañoso"
        className="interactive-object mr"
        onClick={() => setShowPopup(true)}
      />

      {showPopup && (
        <div className="popup">
          <p>
            ¡Hola! Soy Mr. Mañoso.
Toca la radio para escuchar una emisora aleatoria, o el Pip-Boy si prefieres elegir entre las tres radios clásicas de Fallout.
Y si ya tienes canciones favoritas, usa el terminal de la derecha para escucharlas, gestionarlas y controlar el volumen a tu gusto. ¡La música está en tus manos, muchacho del refugio!
          </p>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}
  <div>
      {/* otros elementos del cuarto */}
      <ReproductorFavoritos />
    </div>

   {/* 🚪 Botón para volver al login 3D */}
      <button className="volver-inicio" onClick={onRestart}>
        ← Volver al inicio
      </button>

    </div>
  );
};

export default FinalRoom;
