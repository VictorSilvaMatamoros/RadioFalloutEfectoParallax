import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Auth.css';

export default function Auth({ onLogin, onGuest }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    let res
    if (isSigningUp) {
      res = await supabase.auth.signUp({ email, password })
    } else {
      res = await supabase.auth.signInWithPassword({ email, password })
    }
    if (res.error) setError(res.error.message)
    else onLogin(res.data.user)
  }

  const handleGuestLogin = () => {
    // Pasamos null como usuario para simular un usuario no autenticado
    onLogin(null)
  }

  return (
    <div className="auth-container">
      <h2>{isSigningUp ? 'Regístrate' : 'Inicia Sesión'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {isSigningUp ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <p onClick={() => setIsSigningUp(!isSigningUp)} style={{ cursor: 'pointer' }}>
        {isSigningUp
          ? '¿Ya tienes cuenta? Iniciar sesión'
          : '¿No tienes cuenta? Regístrate'}
      </p>

      {/* 🔓 Botón para entrar como invitado */}
    <button className="boton-invitado" onClick={onGuest}>
  Entrar como invitado
</button>


    </div>
  )
}
