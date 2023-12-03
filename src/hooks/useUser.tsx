import { AuthContext } from '@/context/AuthProvider'
import { useContext } from 'react'

export const useUser = () => {
  const { user } = useContext(AuthContext)
  return user
}
