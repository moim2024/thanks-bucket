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

export const checkIsEmailDuplicated = async (inputEmail: string) => {
  try {
    const userRef = collection(store, COLLECTIONS.USER)

    const emailQuery = query(userRef, where('email', '==', inputEmail))
    const querySnapshot = await getDocs(emailQuery)

    return !querySnapshot.empty
  } catch (error) {
    throw new Error(
      '이메일 중복 결과를 가져오지 못 했어요. 다시 시도해 주세요.',
    )
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
