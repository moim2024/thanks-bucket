import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { signInWithRedirect } from 'firebase/auth'

import { getGoogleRedirectResult } from '@/remote/auth'
import { auth, provider } from '@/remote/firebase'
import Loading from '../shared/Loading'

function GoogleSignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider)
    } catch (error) {
      alert('로그인을 다시 시도해 주세요.') // 변경 예정
    }
  }

  useEffect(() => {
    const getRedirectResult = async () => {
      try {
        await getGoogleRedirectResult()
        setIsLoading(false)
      } catch (error) {
        alert('로그인을 다시 시도해 주세요.') // 변경 예정
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
