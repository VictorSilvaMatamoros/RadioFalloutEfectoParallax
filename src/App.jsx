import React, { useEffect, useState } from "react";
import ParallaxSection from "./components/ParallaxSection";
import FinalRoom from "./components/FinalRoom";
import FinalRoomMobile from "./components/FinalRoomMobile";
import TVLogin3D from "./components/TVLogin3D";
import Auth from "./components/Auth";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [platform, setPlatform] = useState(null); // 'desktop' | 'mobile'
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [audio] = useState(() => new Audio("/efectosAudio/tema_principal.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // ⏺️ Verificar sesión activa de Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔊 Activar música si el usuario interactúa
  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;

    const startAudio = () => {
      if (!userHasInteracted) {
        setUserHasInteracted(true);
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }

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

  // ⛔ MOSTRAR LOGIN si no hay usuario ni invitado
  if (!user && !isGuest) {
    return (
      <Auth
        onLogin={(u) => {
          setUser(u);
          setIsGuest(false);
        }}
        onGuest={() => {
          setIsGuest(true);
          setUser(null);
        }}
      />
    );
  }

  // 📺 Selección de plataforma (desktop o mobile)
  if (!platform) {
    const links = [
      { label: "Ver en Desktop", href: "desktop" },
      { label: "Ver en Móvil", href: "mobile" },
    ];
    return <TVLogin3D links={links} onSelect={setPlatform} />;
  }

  // 🎮 Vista principal
  return (
    <>
      {userHasInteracted && (
        <div className="music-toggle" onClick={toggleAudio}>
          {isPlaying ? "🔇 Silenciar Música ambiente" : "🔊 Música ambiente"}
        </div>
      )}

      {platform === "desktop" ? (
        <ParallaxSection onRestart={() => setPlatform(null)} />
      ) : (
        <FinalRoomMobile
          onRestart={() => setPlatform(null)}
          isGuest={isGuest}
        />
      )}
    </>
  );
}

export default App;
