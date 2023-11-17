import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from './firebase'

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    console.error(error)
    throw new Error('존재하는 계정이 없거나 잘못된 비밀번호에요')
  }
}
