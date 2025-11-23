import { createClient } from '@supabase/supabase-js';

// Default credentials provided by user for activation
const DEMO_URL = "https://ufryumyyftrdpbdkqrro.supabase.co";
const DEMO_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcnl1bXl5ZnRyZHBiZGtxcnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTE0NzQsImV4cCI6MjA3OTQ2NzQ3NH0.A2tSNjUvsywXCrKmm2GoyNTswlzUsg5mkSvYzVX51PQ";

// Helper to get config from env, local storage, or defaults
const getSupabaseConfig = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  
  const localUrl = localStorage.getItem('luna_supabase_url');
  const localKey = localStorage.getItem('luna_supabase_key');

  // Priority: Env -> LocalStorage -> Demo/Hardcoded
  return {
    url: envUrl || localUrl || DEMO_URL,
    key: envKey || localKey || DEMO_KEY
  };
};

const { url, key } = getSupabaseConfig();

export const activeConfig = {
  url,
  key
};

export const supabase = (url && key) 
  ? createClient(url, key) 
  : null;

export const isSupabaseConfigured = () => !!supabase;

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem('luna_supabase_url', url);
  localStorage.setItem('luna_supabase_key', key);
  window.location.reload(); // Reload to re-initialize client
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem('luna_supabase_url');
  localStorage.removeItem('luna_supabase_key');
  window.location.reload();
};