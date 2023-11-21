import { useAuth } from '@/hooks/useAuth'
import Loading from '../shared/Loading'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { initialized } = useAuth()

  if (initialized === false) {
    return <Loading />
  }

  return <>{children}</>
}

export default AuthGuard
