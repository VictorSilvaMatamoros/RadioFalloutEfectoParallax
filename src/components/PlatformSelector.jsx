// src/components/PlatformSelector.jsx
import React from "react";
import "./PlatformSelector.css";

export default function PlatformSelector({ onSelect }) {
  return (
    <div className="selector-overlay">
      <div className="selector-content">
        <h1>¿Vienes desde móvil o desde escritorio?</h1>
        <div className="selector-buttons">
          <button onClick={() => onSelect("desktop")}>Escritorio</button>
          <button onClick={() => onSelect("mobile")}>Móvil</button>
        </div>
      </div>
    </div>
  );
}
