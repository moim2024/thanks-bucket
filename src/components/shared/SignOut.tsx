import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/remote/firebase'
import { useCallback } from 'react'

function SignOut() {
  const navigate = useNavigate()

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth)

      navigate('/signin')
    } catch (error) {
      console.error('로그아웃을 다시 시도해 주세요.', error)
    }
  }, [navigate])
  return <button onClick={handleSignOut}>로그아웃</button>
}

export default SignOut
