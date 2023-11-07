import { useState } from 'react'

interface NicknameSetupProps {
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string>>
  title: string
  buttonText: string
  children?: React.ReactNode
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function NicknameSetupForm({
  nickname,
  setNickname,
  title,
  buttonText,
  children,
  handleSubmit,
}: NicknameSetupProps) {
  const [isNicknameValid, setIsNicknameValid] = useState(true)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/
    const inputValue = e.target.value

    if (regex.test(inputValue)) {
      setNickname(inputValue)
      setIsNicknameValid(true)
    } else {
      setIsNicknameValid(false)
    }
  }

  const handleBlur = () => {
    setIsNicknameValid(true)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>{title}</p>
        <label>
          닉네임
          <input
            value={nickname}
            onChange={handleInput}
            onBlur={handleBlur}
            type="text"
            placeholder="한글 영어 대/소문자 숫자만 입력 가능해요!"
          />
          {!isNicknameValid && (
            <span>한글 영어 대/소문자 숫자만 입력 가능해요!</span>
          )}
        </label>

        <button type="submit">{buttonText}</button>
      </form>
      {children}
    </>
  )
}

export default NicknameSetupForm
