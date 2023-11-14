import {
  signInAnonymously,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
  User,
} from '@firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, provider, store } from './firebase'
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

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider)
  } catch (error) {
    console.error('Google 로그인 오류:', error)
  }
}

export const getGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth)
    return result
  } catch (error) {
    console.error('Google 리디렉션 결과 오류:', error)
  }
}

export const saveUserData = async (user: User) => {
  const { uid, displayName, email, isAnonymous } = user

  const userData = {
    displayName: displayName,
    email: email || '',
    level: isAnonymous ? 0 : 1,
  }

  const userRef = doc(store, COLLECTIONS.USER, uid)

  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    await setDoc(userRef, userData)
  } else {
    await updateDoc(userRef, userData)
  }
}
