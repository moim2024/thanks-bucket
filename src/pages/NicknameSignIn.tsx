import { useState } from 'react'

import { useNavigate } from 'react-router'

import { validateNickname } from '@/utils/validate'
import { saveUserData, signInWithNickname } from '@/remote/auth'

function NicknameSignInPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const validationResult = isTouched ? validateNickname(nickname) : null
  const isFormValid = !validationResult && nickname

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNickname(inputValue)
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched(false)

    try {
      const user = await signInWithNickname(nickname)
      if (user) {
        await saveUserData(user)
      }
      navigate('/buckets')
    } catch (error) {
      console.error('로그인 실패', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>닉네임을 입력해주세요</p>
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
          시작하기
        </button>
      </div>
    </form>
  )
}

export default NicknameSignInPage
