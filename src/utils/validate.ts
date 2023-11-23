import { FormValues } from '@/models/auth'

const REGEX = {
  NICKNAME: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{1,8}$/,
  EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^.{8,}$/,
}

const validateNickname = (nickname: string) => {
  const regex = REGEX.NICKNAME
  if (!nickname || !nickname.trim()) {
    return { message: '닉네임을 반드시 입력해주세요.' }
  }

  if (!regex.test(nickname)) {
    return { message: '한글, 영어 대/소문자, 숫자로 최대 8자까지 가능해요.' }
  }
}

const validateEmail = (email: string) => {
  const regex = REGEX.EMAIL
  if (!email || !email.trim()) {
    return { message: '이메일을 반드시 입력해주세요.' }
  }

  if (!regex.test(email)) {
    return { message: '이메일 형식에 맞게 입력해주세요.' }
  }
}

const validatePassword = (password: string) => {
  const regex = REGEX.PASSWORD
  if (!password || !password.trim()) {
    return { message: '비밀번호를 반드시 입력해주세요.' }
  }

  if (!regex.test(password)) {
    return { message: '최소 8자 이상이여야해요.' }
  }
}

const validatePasswordMatch = (password: string, confirmPassword?: string) => {
  if (!confirmPassword || !confirmPassword.trim()) {
    return { message: '비밀번호 확인을 반드시 입력해주세요.' }
  }

  if (password !== confirmPassword) {
    return { isMatched: false, message: '입력하신 두 비밀번호가 달라요.' }
  } else {
    return { isMathced: true, message: '비밀번호가 일치해요.' }
  }
}

export const checkValidate = (formValues: FormValues) => {
  let errors: { [key: string]: { isMatched?: boolean; message: string } } = {}

  if (formValues.email !== null) {
    const result = validateEmail(formValues.email)
    if (result) {
      errors.email = result
    }
  }
  if (formValues.password !== null) {
    const result = validatePassword(formValues.password)
    if (result) {
      errors.password = result
    }
  }
  if (formValues.confirmPassword !== null) {
    const result = validatePasswordMatch(
      formValues.password,
      formValues.confirmPassword,
    )
    if (result) {
      errors.confirmPassword = result
    }
  }
  if (formValues.nickname !== null) {
    const result = validateNickname(formValues.nickname)
    if (result) {
      errors.nickname = result
    }
  }

  return errors
}
