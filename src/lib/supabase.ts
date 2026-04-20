import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (typeof window !== 'undefined') {
  console.log('DEBUG: Supabase URL detectada:', !!supabaseUrl);
  console.log('DEBUG: Supabase Key detectada:', !!supabaseAnonKey);
}

// Exportamos el cliente solo si las variables están presentes.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any; 

if (!supabase && typeof window !== 'undefined') {
  console.warn('Supabase no se pudo inicializar. Verifica tus variables en Vercel.');
}
