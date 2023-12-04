import { User, getRedirectResult } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { auth, store } from './firebase'
import { COLLECTIONS } from '@/constants'

export const getGoogleRedirectResult = async () => {
  const result = await getRedirectResult(auth)
  if (result) {
    await saveUserData(result.user)
  }
  return result
}

export const saveUserData = async (user: User) => {
  const { uid, displayName, email, isAnonymous } = user

  const userData = {
    displayName,
    email: email ?? '',
    level: isAnonymous ? 0 : 1,
  }

  const userRef = doc(store, COLLECTIONS.USER, uid)

  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    await setDoc(userRef, userData)
  }
}
