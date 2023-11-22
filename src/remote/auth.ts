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
  updateDoc,
  where,
} from 'firebase/firestore'

import { auth, store } from './firebase'
import { COLLECTIONS } from '@/constants'

export const checkIsEmailUnique = async (inputEmail: string) => {
  const userRef = collection(store, COLLECTIONS.USER)
  const emailQuery = query(userRef, where('email', '==', inputEmail))
  const querySnapshot = await getDocs(emailQuery)

  if (querySnapshot.empty) {
    return { message: '사용할 수 있는 이메일이에요.' }
  } else {
    return { message: '이미 사용 중인 이메일이에요.' }
  }
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: nickname,
    })

    await saveUserData(user)

    return user
  } catch (error: any) {
    throw new Error('로그인을 다시 시도해 주세요.')
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
