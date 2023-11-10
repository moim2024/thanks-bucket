import { signInAnonymously, updateProfile } from '@firebase/auth'
import { setDoc, doc, collection } from '@firebase/firestore'
import { useNavigate } from 'react-router'

import { auth, store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import NicknameSetupForm from '@/components/signup/NicknameSetupForm'

function AnonymousSignInPage() {
  const navigate = useNavigate()

  const handleSubmit = async (nickname: string) => {
    try {
      const { user } = await signInAnonymously(auth)

      await updateProfile(user, {
        displayName: nickname,
      })

      const userData = {
        displayName: user.displayName,
        level: 0,
      }

      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), userData)

      navigate('/buckets')
    } catch (error) {
      console.error('로그인 실패', error)
    }
  }

  return (
    <NicknameSetupForm
      handleSubmit={handleSubmit}
      title="닉네임을 입력해주세요"
      buttonText="시작하기"
    />
  )
}

export default AnonymousSignInPage
