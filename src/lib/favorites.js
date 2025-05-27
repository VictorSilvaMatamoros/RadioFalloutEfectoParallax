// src/lib/favorites.js
import { supabase } from './supabaseClient'

export async function addFavorite({ userId, url, title }) {
  return supabase
    .from('favorites')
    .insert([{ user_id: userId, song_url: url, song_title: title }])
}

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
  return { data, error }
}
