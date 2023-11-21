import { auth } from '@/remote/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()
  const handleLogin = async () => {
    const email = 'bucket@bucket.com'
    const password = '12345678'

    await signInWithEmailAndPassword(auth, email, password)
    navigate('/buckets')
  }
  return <button onClick={handleLogin}>로그인</button>
}

export default LoginButton
