import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wzpjchonkpandfuiofcb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cGpjaG9ua3BhbmRmdWlvZmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMDk4MjMsImV4cCI6MjA3MTY4NTgyM30.A0gGJ7Hced7T9LToapG-8wpSKy3VNriNOfD4y8A7u8M";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey, // <--- Använder din definierade variabel här
  {
    auth: {
      // Denna rad fixar LockManager-varningen
      useBrowserLocks: false, 
      autoRefreshToken: true,
      persistSession: true,
      flowType: 'pkce',
    },
  }
);