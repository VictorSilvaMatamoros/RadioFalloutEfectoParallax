import { supabase } from './supabaseClient'

// Añadir a favoritos solo si no está duplicado
export async function addFavorite({ userId, url, title }) {
  // Verificamos si la canción ya está guardada por este usuario
  const { data: existente, error: errorExistente } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('song_url', url)

  if (errorExistente) {
    console.error("Error al comprobar si la canción ya existe:", errorExistente);
    return { error: errorExistente };
  }

  if (existente.length > 0) {
    return { error: null, alreadyExists: true };
  }

  // Si no existe, insertamos
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, song_url: url, song_title: title }])

  return { error, alreadyExists: false };
}


// Eliminar de favoritos
export async function removeFavorite({ userId, url }) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('song_url', url);

  return { error };
}


// Obtener favoritos de un usuario
export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)

  return { data, error }
}
