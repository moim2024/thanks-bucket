import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { signInWithRedirect } from 'firebase/auth'

import { getGoogleRedirectResult } from '@/remote/auth'
import { auth, provider } from '@/remote/firebase'

function GoogleSignIn() {
  const navigate = useNavigate()

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
      } catch (error) {
        alert('로그인을 다시 시도해 주세요.') // 변경 예정
      }
    }

    getRedirectResult()
  }, [navigate])

  return (
    <>
      <button onClick={handleGoogleSignIn}>Google로 시작하기</button>
    </>
  )
}

export default GoogleSignIn
