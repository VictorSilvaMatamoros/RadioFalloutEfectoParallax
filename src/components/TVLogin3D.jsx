// src/components/TVLogin3D.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import "./TVLogin3D.css";

function TVScene({ links, onSelect }) {
  const tv = useGLTF("/models/fallout_television_set.glb");

  return (
    <>
      {/* Modelo de la TV mirando hacia la cámara */}
      <primitive
        object={tv.scene}
        scale={0.2}
        position={[0, -1.5, -20]}
        rotation={[0, 0, 0]}
      />

      {/* Iluminación */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 15, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Controles opcionales */}
      <OrbitControls enablePan={false} enableZoom={true} />

      {/* Botones sobre la “pantalla” de la TV */}
      <Html
        transform
        occlude
        position={[0, 6.4, -5.9]}
        rotation={[0, 0, 0]}
        style={{ pointerEvents: "auto" }}
      >
        <div className="tv-login-buttons">
          {links.map((link) => (
            <button key={link.href} onClick={() => onSelect(link.href)}>
              {link.label}
            </button>
          ))}
        </div>
      </Html>
    </>
  );
}

export default function TVLogin3D({ links, onSelect }) {
  return (
    <div className="tv-login-container">
      <Canvas camera={{ position: [8, 3, 18], fov: 50 }}>
        <Suspense fallback={null}>
          <TVScene links={links} onSelect={onSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
}
