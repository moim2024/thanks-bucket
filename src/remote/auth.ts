import {
  User,
  UserCredential,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth'
import { auth, provider, store } from './firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider)
  } catch (error) {
    throw new Error('로그인을 다시 시도해 주세요.')
  }
}

export const getGoogleRedirectResult =
  async (): Promise<UserCredential | null> => {
    try {
      const result = await getRedirectResult(auth)
      return result
    } catch (error) {
      throw new Error('결과를 가져오지 못 했어요. 다시 시도해 주세요.')
    }
  }

export const saveUserData = async (user: User) => {
  try {
    const { uid, displayName, email, isAnonymous } = user

    const userData = {
      displayName: displayName,
      email: email ?? '',
      level: isAnonymous ? 0 : 1,
    }

    const userRef = doc(store, COLLECTIONS.USER, uid)

    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      await setDoc(userRef, userData)
    } else {
      await updateDoc(userRef, userData)
    }
  } catch (error) {
    console.error(error)
    throw new Error('로그인을 다시 시도해 주세요.')
  }
}
