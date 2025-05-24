import React, { useState } from "react";
import "./RobotGallery.css";
import RobotInfoBox from "./RobotInfoBox";

const robotList = [
  {
    name: "Asaltron",
    image: "/img/Asaltron.png",
    games: ["Fallout 4", "Fallout 76"],
    description:
      "Ágiles robots de combate equipados con camuflaje óptico y láser ocular devastador.",
  },
  {
    name: "Mr. Mañoso",
    image: "/img/Mr.Mañoso.png",
    games: ["Fallout 3", "Fallout: New Vegas", "Fallout 4"],
    description:
      "Diseñado para tareas domésticas. Flota y habla con acento británico mientras porta sierras y sopletes.",
  },
  {
    name: "Securitron",
    image: "/img/Securitron.png",
    games: ["Fallout: New Vegas"],
    description:
      "Guardias acorazados con pantalla facial. Sirven a Mr. House. Cargan ametralladoras y lanzacohetes.",
  },
  {
    name: "Protrectron",
    image: "/img/Protrectron.png",
    games: ["Fallout 3", "Fallout: New Vegas", "Fallout 4"],
    description:
      "Robots de seguridad civil. Lentos pero resistentes. Pueden patrullar zonas peligrosas.",
  },
  {
    name: "Sentry bot",
    image: "/img/Sentry_bot.png",
    games: ["Fallout 3", "Fallout 4", "Fallout 76"],
    description:
      "Robots militares extremadamente destructivos. Usan ametralladoras pesadas y lanzamisiles.",
  },
];

const RobotGallery = ({ scrollY }) => {
  const scale = 1 + scrollY / 2000; // Máximo 1.5
  const translateY = Math.max(200 - scrollY * 0.5, 0); // Baja desde 200px a 0
  const opacity = Math.min(scrollY / 150, 1); // Sube hasta 1

  const bgTranslateY = -scrollY * 0.1; // Se mueve hacia arriba suavemente

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("teleport-in");

  const changeRobot = (direction) => {
    if (animating) return;

    // 🔊 Reproducir sonido
    const audio = new Audio("/efectosAudio/teleport.mp3");
    audio.play();

    setAnimationClass("teleport-out");
    setAnimating(true);

    setTimeout(() => {
      const next =
        direction === "next"
          ? (current + 1) % robotList.length
          : (current - 1 + robotList.length) % robotList.length;

      setCurrent(next);
      setAnimationClass("teleport-in");
    }, 400);

    setTimeout(() => {
      setAnimating(false);
    }, 800);
  };

  return (
    <div className="robot-gallery">
      <img
        src="/img/FondoRobots.png"
        className="robot-bg"
        alt="Fondo robots"
        style={{
          transform: `translateY(${bgTranslateY}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
      <button className="arrow left" onClick={() => changeRobot("prev")}>
        ←
      </button>
      <RobotInfoBox robot={robotList[current]} />

      <img
        key={current}
        src={robotList[current].image}
        className={`robot-img-main ${animationClass}`}
        alt="Robot"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: opacity,
          transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
        }}
      />

      <button className="arrow right" onClick={() => changeRobot("next")}>
        →
      </button>
    </div>
  );
};

export default RobotGallery;
