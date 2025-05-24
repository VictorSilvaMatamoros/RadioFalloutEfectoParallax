import React, { useEffect, useState } from "react";
import ParallaxSection from "./components/ParallaxSection";

function App() {
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

    // Elimina todos los eventos una vez activado
    window.removeEventListener("click", startAudio);
    window.removeEventListener("scroll", startAudio);
    window.removeEventListener("wheel", startAudio);
    window.removeEventListener("touchstart", startAudio);
    window.removeEventListener("keydown", startAudio);
  };

  // Añadimos todos los eventos relevantes
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

  return (
    <>
      {userHasInteracted && (
        <div className="music-toggle" onClick={toggleAudio}>
          {isPlaying ? "🔇 Mute" : "🔊 Play"}
        </div>
      )}
      <ParallaxSection />
    </>
  );
}

export default App;
