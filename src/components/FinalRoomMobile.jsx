import React, { useState } from "react";
import "./FinalRoomMobile.css";
import LogicaReproductor from "./LogicaReproductor";
import RadioPlayer from "./RadioPlayer";
import FavoritosPlayer from "./ReproductorFavoritos";

export default function FinalRoomMobile({ onRestart }) {
  const [showPip, setShowPip] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="final-mobile-container">
      <div className="mobile-blur-bg" />

      <img
        src="/img/Mr.Mañoso.png"
        alt="Mr. Mañoso"
        className="mobile-mr"
        onClick={() => setShowPopup(true)}
      />

      <button className="mobile-restart" onClick={onRestart}>
        ← Inicio
      </button>

      {showPopup && (
        <div className="popup">
          <p>
            ¡Hola! Soy Mr. Mañoso. Toca la radio para escuchar una emisora al azar,
            o el Pip-Boy para elegir entre las tres emisoras de radio de Fallout,
            o baja a la parte inferior para reproducir tu lista de canciones favoritas.
          </p>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}

      {showPip && (
        <div className="mobile-overlay">
          <LogicaReproductor onClose={() => setShowPip(false)} />
        </div>
      )}

      {showRadio && (
        <div className="mobile-overlay">
          <RadioPlayer onClose={() => setShowRadio(false)} />
        </div>
      )}

      <div className="mobile-actions">
        <img
          src="/img/PipBoy_Reposo.png"
          alt="Pip-Boy"
          className="mobile-icon pipboy-icon"
          onClick={() => {
            setShowPip(true);
            setShowPopup(false);
          }}
        />
        <img
          src="/img/radio.png"
          alt="Radio"
          className="mobile-icon radio-icon"
          onClick={() => {
            setShowRadio(true);
            setShowPopup(false);
          }}
        />
      </div>

      {/* 🎵 FAVORITOS SIEMPRE VISIBLES */}
      <div className="favoritos-mobile-wrapper">
        <FavoritosPlayer />
      </div>
    </div>
  );
}
