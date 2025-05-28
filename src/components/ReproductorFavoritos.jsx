import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./ReproductorFavoritos.css";

function ReproductorFavoritos() {
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [volumen, setVolumen] = useState(0.5);
  const [mostrarControles, setMostrarControles] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Obtener el usuario actual de Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  // Cargar canciones favoritas del usuario
  useEffect(() => {
    if (!user) return;
    const fetchFavoritos = async () => {
      const { data } = await supabase
        .from("favorites")
        .select("song_url, song_title")
        .eq("user_id", user.id);
      setFavoritos(data || []);
    };
    fetchFavoritos();
  }, [user]);

  // Ajustar volumen en el ref del audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen;
    }
  }, [volumen]);

  const cancion = favoritos[indiceActual];

  const reproducir = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausar = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const siguiente = () => {
    setIndiceActual((prev) => (prev + 1) % favoritos.length);
  };

  const anterior = () => {
    setIndiceActual((prev) => (prev - 1 + favoritos.length) % favoritos.length);
  };

  // Reproduce automáticamente la nueva canción si ya estaba en reproducción
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [indiceActual]);

  // Si no hay usuario, no renderizar nada
  if (!user) return null;

  return (
    <div className="favoritos-container">
      {/* Icono PNG siempre visible si hay usuario */}
      <img
        src="/img/Favoritos.png"
        alt="Favoritos"
        className="fondo-png"
        onClick={() => {
          if (favoritos.length === 0) {
            alert("No tienes canciones en favoritos");
          } else {
            setMostrarControles(!mostrarControles);
          }
        }}
      />

      {/* Mostrar controles solo si hay canciones y se han activado */}
      {mostrarControles && favoritos.length > 0 && (
        <div className="controles-favoritos">
          <button
            className="cerrar-favoritos"
            onClick={() => {
              setMostrarControles(false);
              if (audioRef.current) audioRef.current.pause();
              setIsPlaying(false);
            }}
          >
            X
          </button>

          <label className="label-volumen">Tu lista de Favoritos</label>
          <h3>{cancion?.song_title}</h3>
          <div className="botones">
            <button onClick={anterior}>⏮</button>
            <button onClick={reproducir}>▶</button>
            <button onClick={pausar}>⏸</button>
            <button onClick={siguiente}>⏭</button>
          </div>

          <label className="label-volumen">Volumen</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumen}
            onChange={(e) => setVolumen(parseFloat(e.target.value))}
          />
        </div>
      )}

      {/* Audio control con canción actual */}
      {cancion && (
        <audio ref={audioRef} src={cancion.song_url} onEnded={siguiente} />
      )}
    </div>
  );
}

export default ReproductorFavoritos;
