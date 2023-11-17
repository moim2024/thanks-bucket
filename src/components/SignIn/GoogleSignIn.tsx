import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { getGoogleRedirectResult, signInWithGoogle } from '@/remote/auth'
import { saveUserData } from '@/remote/auth'
import Loading from '../shared/Loading'

function GoogleSignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const getRedirectResult = async () => {
      try {
        const result = await getGoogleRedirectResult()
        setIsLoading(false)
        if (result && result.user) {
          navigate('/buckets')
          await saveUserData(result.user)
        }
      } catch (error) {
        alert(error)
      }
    }

    getRedirectResult()
  }, [navigate])

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
