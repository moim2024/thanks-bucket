import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/remote/firebase'
import { FormValues } from '@/models/signIn'

interface SignInProps {
  setSubmitError: React.Dispatch<
    React.SetStateAction<{ isError: boolean; message: string }>
  >
}

function useSignIn({ setSubmitError }: SignInProps) {
  const navigate = useNavigate()
  const handleSignIn = async (signInData: FormValues) => {
    try {
      const { email, password } = signInData
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/buckets')
    } catch (error) {
      setSubmitError({
        isError: true,
        message: '존재하는 계정이 없거나 잘못된 비밀번호에요',
      })
    }
  }
  return handleSignIn
}

export default useSignIn
