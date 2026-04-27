import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './supabase-config';

const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
