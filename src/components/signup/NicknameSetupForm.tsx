import { useState } from 'react'

import { REGEX } from '@/constants'

interface NicknameSetupProps {
  title: string
  buttonText: string
  children?: React.ReactNode
  handleSubmit: (nickname: string) => void
}

function NicknameSetupForm({
  title,
  buttonText,
  children,
  handleSubmit,
}: NicknameSetupProps) {
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(true)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = REGEX.NICKNAME
    const inputValue = e.target.value

    if (regex.test(inputValue)) {
      setNickname(inputValue)
      setIsNicknameValid(true)
    } else {
      setNickname(inputValue)
      setIsNicknameValid(false)
    }
  }

  const handleBlur = () => {
    setIsNicknameValid(true)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(nickname)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
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
