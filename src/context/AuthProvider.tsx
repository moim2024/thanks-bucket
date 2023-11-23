import { Dispatch, SetStateAction, createContext, useState } from 'react'

import { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  initialized: boolean
  setUser: Dispatch<SetStateAction<User | null>>
  setInitialized: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
  setUser: () => {},
  setInitialized: () => {},
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  return (
    <AuthContext.Provider
      value={{ user, initialized, setUser, setInitialized }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
