import React, { useState } from "react";
import "./CircularSlider.css";

interface Item {
  name: string;
  image: string;
  angleDeg?: number;
}

interface CircularSliderProps {
  items: Item[];
}

const CircularSlider: React.FC<CircularSliderProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Radio del semicírculo
  const radius = 220;

  // Identificar índices sin ángulo predefinido
  const defaultAngles = items
    .map((i, idx) => (i.angleDeg == null ? idx : null))
    .filter((v) => v != null) as number[];

  // Repartir ángulos uniformemente en 0..180°
  const step = 180 / (items.length - 1);
  defaultAngles.forEach((idx, order) => {
    items[idx].angleDeg = step * order;
  });

  return (
    <section className="circular-slider-section">
      <div className="names-container">
        {items.map((item, i) => {
          const angle = item.angleDeg!;
          const rad = (angle * Math.PI) / 180;
          // Desplazamiento desde el centro
          const dx = radius * Math.cos(rad);
          const dy = radius * Math.sin(rad);
          // Rrotación para mirar al centro
          const rotateDeg = angle - 90;

          return (
            <div
              key={i}
              className="name-item"
              style={{
                left: `calc(50% + ${dx}px)`,
                top: `calc(50% - ${dy}px)`,
                transform: `translate(-50%, -50%) rotate(${rotateDeg}deg)`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="name-label">{item.name}</span>
              <span className="name-number">{i + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="image-display">
        {hoveredIndex != null && (
          <img
            src={items[hoveredIndex].image}
            alt={items[hoveredIndex].name}
          />
        )}
      </div>
    </section>
  );
};

export default CircularSlider;