// src/components/RadioPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import { useRadioBrowser } from "./useRadioBrowser"
import "./RadioPlayer.css";

export default function RadioPlayer({ onClose }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const { stations, loading } = useRadioBrowser({ country: "ES", limit: 50, tag: "music" });

  // Al cambiar emisora o volumen, actualiza audio
  useEffect(() => {
    if (!audioRef.current || !stations.length) return;
    audioRef.current.src = stations[currentIdx].url_resolved;
    audioRef.current.volume = volume;
    if (playing) audioRef.current.play().catch(() => {});
  }, [currentIdx, stations, volume, playing]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  const prevStation = () =>
    setCurrentIdx((i) => (stations.length ? (i - 1 + stations.length) % stations.length : 0));
  const nextStation = () =>
    setCurrentIdx((i) => (stations.length ? (i + 1) % stations.length : 0));

  if (loading) return <div className="radio-loading">Cargando emisoras…</div>;
  if (!stations.length) return <div className="radio-empty">No hay emisoras</div>;

  const current = stations[currentIdx];

  return (
<>
  <div className="radio-backdrop" />
  <div className="radio-container">
    <img src="/img/radio.png" alt="Radio" className="radio-bg" />

    <div className="station-title">{current.name}</div>

    <button className="prev-btn" onClick={prevStation}>⏮️</button>
    <button className="play-btn" onClick={togglePlay}>
      {playing ? '⏸️' : '▶️'}
    </button>
    <button className="next-btn" onClick={nextStation}>⏭️</button>

    <div className="volume-control">
      <label htmlFor="volumen">Volumen</label>
      <input
        id="volumen"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
      />
    </div>

    <button className="close-btn" onClick={onClose}>❌</button>

    <audio ref={audioRef} onEnded={nextStation} />
  </div>
</>
  );
}
