import { useState } from 'react'

import { signInAnonymously, updateProfile } from '@firebase/auth'
import { setDoc, doc, collection } from '@firebase/firestore'
import { useNavigate } from 'react-router'

import { auth, store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import NicknameSetupForm from '@/components/signup/NicknameSetupForm'

function AnonymousSignInPage() {
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nickname) {
      try {
        const { user } = await signInAnonymously(auth)

        await updateProfile(user, {
          displayName: nickname,
        })

        const userData = {
          displayName: user.displayName,
          level: 0,
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          userData,
        )

        navigate('/buckets')
      } catch (error) {
        console.error('로그인 실패', error)
      }
    } else {
      console.error('한글, 영어 대소문자, 숫자만 가능합니다')
    }
  }

  return (
    <NicknameSetupForm
      nickname={nickname}
      setNickname={setNickname}
      handleSubmit={handleSubmit}
      title="닉네임을 입력해주세요"
      buttonText="시작하기"
    />
  )
}

export default AnonymousSignInPage
