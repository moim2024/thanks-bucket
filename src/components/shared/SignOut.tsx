import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/remote/firebase'

function SignOut() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut(auth)

      navigate('/signin')
    } catch (error) {
      console.error(error)
    }
  }
  return <button onClick={handleSignOut}>로그아웃</button>
}

export default SignOut
