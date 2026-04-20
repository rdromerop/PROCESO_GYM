import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Exportamos el cliente solo si las variables están presentes.
// Esto evita que Next.js rompa el build durante el prerendering estático.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any; 

if (!supabase) {
  console.warn('Supabase URL o Anon Key ausentes. Esto es normal durante el build estático inicial.');
}
