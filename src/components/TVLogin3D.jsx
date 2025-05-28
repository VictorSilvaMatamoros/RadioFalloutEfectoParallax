// src/components/TVLogin3D.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { supabase } from "../lib/supabaseClient"; // Asegúrate de tener este archivo
import "./TVLogin3D.css";

function TVScene({ links, onSelect, onLogout, session }) {
  const tv = useGLTF("/models/fallout_television_set.glb");

  return (
    <>
      {/* Modelo de la TV */}
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

      {/* Controles */}
      <OrbitControls enablePan={false} enableZoom={false} />

      {/* Botones sobre la TV */}
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
          {/* Mostrar botón de cerrar sesión si hay sesión activa */}
          {session && (
            <button className="logout-btn" onClick={onLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </Html>
    </>
  );
}

export default function TVLogin3D({ links, onSelect }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Obtenemos la sesión al cargar
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Escuchamos cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="tv-login-container">
      <Canvas camera={{ position: [8, 3, 18], fov: 50 }}>
        <Suspense fallback={null}>
          <TVScene
            links={links}
            onSelect={onSelect}
            onLogout={handleLogout}
            session={session}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
