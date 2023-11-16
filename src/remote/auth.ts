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

    await saveUserData(user)

    return user
  } catch (error) {
    console.error(error)
    throw new Error('로그인을 다시 시도해 주세요.')
  }
}

export const saveUserData = async (user: User) => {
  try {
    const { uid, displayName, email, isAnonymous } = user

    const userData = {
      displayName: displayName,
      email: email || '',
      level: isAnonymous ? 0 : 1,
    }

    await setDoc(doc(store, COLLECTIONS.USER, uid), userData)
  } catch (error) {
    console.error(error)
    throw new Error('로그인을 다시 시도해 주세요.')
  }
}
