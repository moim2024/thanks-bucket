import { REGEX } from '@/constants'

export const validateNickname = (nickname: string) => {
  const regex = REGEX.NICKNAME
  if (!nickname.trim()) {
    return { message: '닉네임을 반드시 입력해주세요.' }
  }

  if (!regex.test(nickname)) {
    return { message: '한글 영어 대/소문자 숫자만 입력 가능해요.' }
  }
  return null
}

export const validateEmail = (email: string) => {
  const regex = REGEX.EMAIL
  if (!email.trim()) {
    return { message: '이메일을 반드시 입력해주세요.' }
  }

  if (!regex.test(email)) {
    return { message: '이메일 형식이 올바르지 않아요.' }
  }
}

export const validatePassword = (password: string) => {
  const regex = REGEX.PASSWORD
  if (!password.trim()) {
    return { message: '비밀번호를 반드시 입력해주세요.' }
  }

  if (!regex.test(password)) {
    return { message: '비밀번호는 8자 이상 입력해주세요.' }
  }
}

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword.trim()) {
    return { message: '비밀번호 확인을 반드시 입력해주세요.' }
  }

  if (password !== confirmPassword) {
    return { message: '비밀번호가 일치하지 않아요.' }
  }
}
