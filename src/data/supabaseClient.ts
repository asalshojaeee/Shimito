import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhlttacyusnfinqxhvhx.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobHR0YWN5dXNuZmlucXhodmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjc3NTcsImV4cCI6MjA4MDg0Mzc1N30.b3W_u_MbPC5JpJhMn0MfwEGLQqIHJM4YZT7R2Oaxkuk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
