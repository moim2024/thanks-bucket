import { signInAnonymously, updateProfile } from '@firebase/auth'

import { auth } from './firebase'

export const signInWithNickname = async (nickname: string) => {
  try {
    const { user } = await signInAnonymously(auth)

    await updateProfile(user, {
      displayName: nickname,
    })
  } catch (error) {
    console.error('로그인 실패', error)
  }
}
