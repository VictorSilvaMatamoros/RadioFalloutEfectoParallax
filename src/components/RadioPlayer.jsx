// src/components/RadioPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { useRadioBrowser } from "./useRadioBrowser";
import "./RadioPlayer.css";

export default function RadioPlayer({ onClose }) {
  const { stations, loading } = useRadioBrowser({ country: "ES", limit: 30 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef();

  // Cuando cambie de estación, recarga el audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (playing) audioRef.current.play().catch(() => {});
    }
  }, [index]);

  const station = stations[index] || {};

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {
        console.warn("Usuario debe interactuar primero");
      });
    }
  };

  const handleNext = () => {
    setPlaying(false);
    setIndex((i) => (i + 1) % stations.length);
  };
  const handlePrev = () => {
    setPlaying(false);
    setIndex((i) => (i - 1 + stations.length) % stations.length);
  };

  if (loading) return <div className="radio-player">Cargando emisoras…</div>;
  if (!station.name) return <div className="radio-player">No hay emisoras.</div>;

  return (
    <div className="radio-player">
      {/* Fondo difuminado */}
      <div className="fondo-blur" />

      <h2>📻 {station.name}</h2>
      <p className="tagline">{station.tags?.split(",")[0]}</p>

      <div className="radio-controls">
        <button onClick={handlePrev}>⏮️</button>
        <button onClick={handlePlayPause}>
          {playing ? "⏸️" : "▶️"}
        </button>
        <button onClick={handleNext}>⏭️</button>
        <button onClick={onClose}>❌</button>
      </div>

      <div className="volume-control">
        Volumen
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
        />
      </div>

      <audio ref={audioRef}>
        <source src={station.url_resolved || station.url} type="audio/mpeg" />
      </audio>
    </div>
  );
}
