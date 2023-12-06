import {
  updateProfile,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { auth, store } from './firebase'
import { COLLECTIONS } from '@/constants'

export const getUserByEmail = async (email: string) => {
  const userRef = collection(store, COLLECTIONS.USER)
  const emailQuery = query(userRef, where('email', '==', email))
  const querySnapshot = await getDocs(emailQuery)

  if (querySnapshot.empty) {
    return null
  } else {
    return querySnapshot.docs[0].data()
  }
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(user, {
    displayName: nickname,
  })

  await saveUserData(user)

  return user
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
