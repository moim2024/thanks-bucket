import { FormValues } from '@/models/auth'
import { signUpWithEmail } from '@/remote/auth'
import { useNavigate } from 'react-router-dom'

function useSignUp() {
  const navigate = useNavigate()

  const handleSignUp = async (signUpData: FormValues) => {
    const { email, password, nickname } = signUpData
    try {
      await signUpWithEmail(email, password, nickname)
      navigate('/buckets')
    } catch (error) {
      alert(error) // 추후 수정
    }
  }
  return handleSignUp
}

export default useSignUp
