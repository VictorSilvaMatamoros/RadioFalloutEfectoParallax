// src/App.jsx
import React, { useEffect, useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import ParallaxSection from "./components/ParallaxSection";
import FinalRoom from "./components/FinalRoom";

function App() {
  // 1️⃣ Selección de plataforma
  const [platform, setPlatform] = useState(null); // 'desktop' | 'mobile'

  // 2️⃣ Lógica de audio
  const [audio] = useState(() => new Audio("/efectosAudio/tema_principal.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

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

    return () => {
      audio.pause();
    };
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

  // 3️⃣ Antes de elegir plataforma, mostramos selector
  if (!platform) {
    return <PlatformSelector onSelect={setPlatform} />;
  }

  // 4️⃣ Renderizamos toggle + experiencia según plataforma
  return (
    <>
      {userHasInteracted && (
        <div className="music-toggle" onClick={toggleAudio}>
          {isPlaying ? "🔇 Mute" : "🔊 Play"}
        </div>
      )}
      {platform === "desktop" ? (
        <ParallaxSection />
      ) : (
        // Aquí cambiamos para móvil:
        <FinalRoom />
      )}
    </>
  );
}

export default App;
