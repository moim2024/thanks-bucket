import { useNavigate } from 'react-router-dom'
import { getGoogleRedirectResult, signInWithGoogle } from '@/remote/auth'
import { saveUserData } from '@/remote/auth'
import { useEffect, useState } from 'react'
import { UserCredential } from 'firebase/auth'
import Loading from '../shared/Loading'

function GoogleSignIn() {
  const navigate = useNavigate()
  const [redirectResult, setRedirectResult] = useState<
    UserCredential | null | undefined
  >(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signInWithGoogle()
  }

  useEffect(() => {
    ;(async () => {
      const result = await getGoogleRedirectResult()
      setRedirectResult(result)
      setIsLoading(false)
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
      {isLoading && <Loading />}
      <button onClick={handleGoogleSignIn} disabled={isLoading}>
        Google로 시작하기
      </button>
    </>
  )
}

export default GoogleSignIn
