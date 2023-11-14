import { useNavigate } from 'react-router-dom'
import { getGoogleRedirectResult, signInWithGoogle } from '@/remote/auth'
import { saveUserData } from '@/remote/auth'
import { useEffect, useState } from 'react'
import { UserCredential } from 'firebase/auth'

function GoogleSignIn() {
  const navigate = useNavigate()
  const [redirectResult, setRedirectResult] = useState<
    UserCredential | null | undefined
  >(null)

  console.log('result', redirectResult)

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
  }

  useEffect(() => {
    ;(async () => {
      const result = await getGoogleRedirectResult()
      setRedirectResult(result)
    })()
  }, [])

  useEffect(() => {
    if (redirectResult && redirectResult.user) {
      saveUserData(redirectResult.user)

      navigate('/buckets')
    }
  }, [redirectResult, navigate])

  return (
    <>
      <button onClick={handleGoogleSignIn}>Google로 시작하기</button>
    </>
  )
}

export default GoogleSignIn
