import { useEffect } from 'react'

import { getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, provider, store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

function GoogleSignIn() {
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleUserDataAndRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)

        if (result?.user) {
          const userId = result?.user.uid
          const userDoc = await getDoc(
            doc(collection(store, COLLECTIONS.USER), userId),
          )

          if (!userDoc.exists()) {
            const userData = {
              displayName: result?.user.displayName,
              level: 1,
            }
            await setDoc(
              doc(collection(store, COLLECTIONS.USER), userId),
              userData,
            )
            navigate('/user/setting/nickname')
          } else {
            navigate('/buckets')
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleUserDataAndRedirect()
  }, [navigate])

  return <button onClick={handleGoogleSignIn}>Google로 시작하기</button>
}

export default GoogleSignIn
