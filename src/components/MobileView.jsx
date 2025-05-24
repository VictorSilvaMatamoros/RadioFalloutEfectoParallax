// src/components/MobileView.jsx
import React, { useState } from "react";
import "./MobileView.css";
import LogicaReproductor from "./LogicaReproductor";

export default function MobileView() {
  const [open, setOpen] = useState(true);

  return (
    <div className="mobile-overlay">
      {/* fondo difuminado */}
      <div className="mobile-blur-backdrop" />

      {/* Pip-Boy */}
      {open && (
        <div className="mobile-pipboy-container">
          <img
            src="/img/radio.png"
            alt="Pip-Boy"
            className="mobile-pipboy-img"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* al pulsar, abrimos el reproductor */}
      {!open && <LogicaReproductor onClose={() => setOpen(true)} />}
    </div>
  );
}
