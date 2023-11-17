export const REGEX = {
  NICKNAME: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/,
}

export const validateNickname = (nickname: string) => {
  const regex = REGEX.NICKNAME
  if (!nickname.trim()) {
    return { message: '닉네임을 반드시 입력해주세요!' }
  }

  if (!regex.test(nickname)) {
    return { message: '한글 영어 대/소문자 숫자만 입력 가능해요!' }
  }
  return null
}
