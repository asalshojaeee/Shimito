import { Navigate } from 'react-router-dom'
import { supabase } from '../data/supabaseClient'
import { useEffect, useState, type JSX } from 'react'
import Loader from './Loader'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    // می‌تونی یک spinner یا null بگذاری
    return (
     <Loader/>
    )
  }

  if (!user) return <Navigate to='/register' replace />

  return children
}

export default ProtectedRoute
