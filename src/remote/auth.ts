import { signInAnonymously, updateProfile, User } from '@firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, store } from './firebase'
import { COLLECTIONS } from '@/constants'

export const signInWithNickname = async (nickname: string) => {
  try {
    const { user } = await signInAnonymously(auth)

    await updateProfile(user, {
      displayName: nickname,
    })

    return user
  } catch (error) {
    console.error('로그인 실패', error)
  }
}

export const saveUserData = async (user: User) => {
  const { uid, displayName, email, isAnonymous } = user

  const userData = {
    displayName: displayName,
    email: email || '',
    level: isAnonymous ? 0 : 1,
  }

  await setDoc(doc(store, COLLECTIONS.USER, uid), userData)
}
