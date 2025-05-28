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

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchFavoritos = async () => {
      const { data } = await supabase
        .from("favorites")
        .select("song_url, song_title")
        .eq("user_id", user.id);
      setFavoritos(data);
    };
    fetchFavoritos();
  }, [user]);

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
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [indiceActual]);

  if (!user || favoritos.length === 0) return null;

  return (
    <div className="favoritos-container">
      {/* PNG que se comporta como botón */}
      <img
        src="/img/Favoritos.png"
        alt="Favoritos"
        className="fondo-png"
        onClick={() => setMostrarControles(!mostrarControles)}
      />

      {mostrarControles && (
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
          <h3>{cancion.song_title}</h3>
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

      <audio ref={audioRef} src={cancion.song_url} onEnded={siguiente} />
    </div>
  );
}

export default ReproductorFavoritos;
