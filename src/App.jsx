// src/App.jsx
import React, { useEffect, useState } from "react";
import ParallaxSection from "./components/ParallaxSection";
import FinalRoom from "./components/FinalRoom";
import FinalRoomMobile from "./components/FinalRoomMobile";
import TVLogin3D from "./components/TVLogin3D";

import Auth from "./components/Auth";
import { supabase } from "./lib/supabaseClient";

function App() {
  // 1️⃣ Plataforma elegida tras el “login 3D”
  const [platform, setPlatform] = useState(null); // 'desktop' | 'mobile'
  const [user, setUser] = useState(null);
  // 2️⃣ Lógica de audio
  const [audio] = useState(() => new Audio("/efectosAudio/tema_principal.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);


const [isGuest, setIsGuest] = useState(false);


  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;

    const startAudio = () => {
      if (!userHasInteracted) {
        setUserHasInteracted(true);
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.warn("Audio bloqueado:", e));
      }
      // desregistramos los eventos
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("wheel", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    window.addEventListener("click", startAudio);
    window.addEventListener("scroll", startAudio);
    window.addEventListener("wheel", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("keydown", startAudio);

    return () => audio.pause();
  }, [audio, userHasInteracted]);

  const toggleAudio = () => {
    if (!userHasInteracted) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  // 0️⃣ Revisar si ya hay sesión activa
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUser(data.session.user)
    })
    // Escuchar cambios de auth (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
     setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

if (!user && !isGuest) {
  return <Auth 
    onLogin={(u) => setUser(u)} 
    onGuest={() => setIsGuest(true)} 
  />
}

  // 3️⃣ Si no hay plataforma elegida, mostramos la TV 3D con links
  if (!platform) {
    const links = [
      { label: "Ver en Desktop", href: "desktop" },
      { label: "Ver en Móvil", href: "mobile" },
    ];

    // TVLogin3D llamará a onSelect con "desktop" o "mobile"
    return <TVLogin3D links={links} onSelect={setPlatform} />;
  }

  // 4️⃣ Una vez seleccionada, renderizamos la experiencia
  return (
    <>
      {userHasInteracted && (
        <div className="music-toggle" onClick={toggleAudio}>
          {isPlaying ? "🔇 Silenciar Música ambiente" : "🔊 Música ambiente"}
        </div>
      )}
      {platform === "desktop" ? (
      // Le pasamos onRestart para que FinalRoom dentro del Parallax también lo reciba
       <ParallaxSection onRestart={() => setPlatform(null)} />
    ) : (
<FinalRoomMobile onRestart={() => setPlatform(null)} isGuest={isGuest} />
     )}
    </>
  );
}

export default App;
