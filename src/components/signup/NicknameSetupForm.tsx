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

  const regex = REGEX.NICKNAME
  const isNicknameValid = regex.test(nickname) || !isTouched
  const isNull = isTouched && nickname === ''
  const isFormValid = isNicknameValid && nickname

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNickname(inputValue)
    setIsTouched(true)
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isNicknameValid) return
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
          {!isNicknameValid && (
            <span>한글 영어 대/소문자 숫자만 입력 가능해요!</span>
          )}
          {isNull && <span>닉네임을 반드시 입력해주세요!</span>}
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
