// src/components/FinalRoomMobile.jsx
import React, { useState } from "react";
import "./FinalRoomMobile.css";
import LogicaReproductor from "./LogicaReproductor";
import RadioPlayer from "./RadioPlayer";

export default function FinalRoomMobile({ onRestart }) {
  const [showPip, setShowPip] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="final-mobile-container">
      {/* Fondo difuminado */}
      <div className="mobile-blur-bg" />

      {/* Mr. Mañoso: abre el popup */}
      <img
        src="/img/Mr.Mañoso.png"
        alt="Mr. Mañoso"
        className="mobile-mr"
        onClick={() => setShowPopup(true)}
      />

      {/* Volver al login 3D */}
      <button className="mobile-restart" onClick={onRestart}>
        ← Inicio
      </button>

      {/* Popup de Mr. Mañoso */}
      {showPopup && (
        <div className="popup">
          <p>
            ¡Hola! Soy Mr. Mañoso. Toca la radio para escuchar una emisora al azar,
            o el Pip-Boy para elegir entre las tres emisoras de radio de Fallout.
          </p>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}

      {/* Overlay de Pip-Boy */}
      {showPip && (
        <div className="mobile-overlay">
          <LogicaReproductor onClose={() => setShowPip(false)} />
        </div>
      )}

      {/* Overlay de Radio */}
      {showRadio && (
        <div className="mobile-overlay">
          <RadioPlayer onClose={() => setShowRadio(false)} />
        </div>
      )}

      {/* Barra inferior con íconos */}
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
    </div>
  );
}
