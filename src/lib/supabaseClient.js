// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kvzddbfkrkmcernfbxen.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2emRkYmZrcmttY2VybmZieGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDMyNjEsImV4cCI6MjA2MTUxOTI2MX0.40IWDVfouXtAc8CNo-2sSgZbfdICQ1_pqH9lAMklUjk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
