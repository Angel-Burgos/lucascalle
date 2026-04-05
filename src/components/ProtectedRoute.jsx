import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setChecking(false)
      if (!u) navigate('/login')
    })
    return () => unsub()
  }, [])

  if (checking) return <div className="auth-checking">...</div>
  if (!user) return null
  return children
}
