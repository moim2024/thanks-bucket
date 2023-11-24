const REGEX = {
  EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^.{8,}$/,
}

export const validateEmail = (email: string) => {
  const regex = REGEX.EMAIL
  if (!email || !email.trim()) {
    return { message: '이메일을 반드시 입력해주세요.' }
  }

  if (!regex.test(email)) {
    return { message: '이메일 형식에 맞게 입력해주세요.' }
  }
}

export const validatePassword = (password: string) => {
  const regex = REGEX.PASSWORD
  if (!password || !password.trim()) {
    return { message: '비밀번호를 반드시 입력해주세요.' }
  }

  if (!regex.test(password)) {
    return { message: '최소 8자 이상이여야해요.' }
  }
}
