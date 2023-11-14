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
  const [isTouched, setIsTouched] = useState(false)

  const validateNickname = (nickname: string) => {
    const regex = REGEX.NICKNAME
    if (!nickname.trim()) {
      return { message: '닉네임을 반드시 입력해주세요!' }
    }

    if (!regex.test(nickname)) {
      return { message: '한글 영어 대/소문자 숫자만 입력 가능해요!' }
    }
    return null
  }

  const validationResult = isTouched ? validateNickname(nickname) : null
  const isFormValid = !validationResult && nickname

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNickname(inputValue)
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validationResult) return
    handleSubmit(nickname)
    setIsTouched(false)
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
          {validationResult && <span>{validationResult.message}</span>}
        </label>

        <div>
          <button type="submit" disabled={!isFormValid}>
            {buttonText}
          </button>
        </div>
      </form>
      {children}
    </>
  )
}

export default NicknameSetupForm
