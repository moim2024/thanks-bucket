import { useEffect } from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import { useAuth } from '@/hooks/useAuth'
import { auth } from '@/remote/firebase'
import Loading from '../shared/Loading'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { initialized, setUser, setInitialized } = useAuth()

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
