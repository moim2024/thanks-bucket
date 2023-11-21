import { createContext, useEffect, useState } from 'react'

import { User, onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/remote/firebase'

interface AuthContextType {
  user: User | null
  initialized: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
