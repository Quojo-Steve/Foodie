import { createClient } from '@supabase/supabase-js';

// Use environment variables for production security
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://cnvrayitrkqgswkndmdu.supabase.co";
const SUPABASE_ANON_KEY = process.env.REACT_APP_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudnJheWl0cmtxZ3N3a25kbWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDM0OTUsImV4cCI6MjA1OTE3OTQ5NX0.aOd0di6xtYpa9sci8Ktw3K7wV6nHeoKYKQUxBWZJS4M";

// Enhanced client configuration
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});