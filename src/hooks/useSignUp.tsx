import { useNavigate } from 'react-router-dom'

import { signUpWithEmail } from '@/remote/auth'
import { FormValues } from '@/models/signup'

function useSignUp() {
  const navigate = useNavigate()

  const handleSignUp = async (signUpData: FormValues) => {
    const { email, password, nickname } = signUpData
    try {
      await signUpWithEmail(email, password, nickname)
      navigate('/buckets')
    } catch (error) {
      console.error(error) // 추후 수정
    }
  }
  return handleSignUp
}

export default useSignUp
