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

export const checkIsEmailUnique = async (inputEmail: string) => {
  const userRef = collection(store, COLLECTIONS.USER)
  const emailQuery = query(userRef, where('email', '==', inputEmail))
  const querySnapshot = await getDocs(emailQuery)

  if (querySnapshot.empty) {
    return { isUnique: true, message: '사용할 수 있는 이메일이에요.' }
  } else {
    return { isUnique: false, message: '이미 사용 중인 이메일이에요.' }
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
    displayName: displayName,
    email: email ?? '',
    level: isAnonymous ? 0 : 1,
  }

  const userRef = doc(store, COLLECTIONS.USER, uid)

  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    await setDoc(userRef, userData)
  }
}
