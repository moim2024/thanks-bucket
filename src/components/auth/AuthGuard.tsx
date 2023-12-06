import { useContext, useEffect, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/remote/firebase'
import Loading from '../shared/Loading'
import { AuthContext } from '@/context/AuthProvider'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { setUser } = useContext(AuthContext)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [setInitialized, setUser])

  if (initialized === false) {
    return <Loading />
  }

  return <>{children}</>
}

export default AuthGuard
