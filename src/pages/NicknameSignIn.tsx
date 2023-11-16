import { useState } from 'react'

import { useNavigate } from 'react-router'

import { validateNickname } from '@/utils/validate'
import { signInWithNickname } from '@/remote/auth'

function NicknameSignInPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isNicknameInvalid = isTouched && validateNickname(nickname)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNickname(inputValue)
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithNickname(nickname)
      navigate('/buckets')
    } catch (error) {
      alert(error)
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
        {isNicknameInvalid && <span>{isNicknameInvalid.message}</span>}
      </label>

      <div>
        <button type="submit" disabled={!!validateNickname(nickname)}>
          시작하기
        </button>
      </div>
    </form>
  )
}

export default NicknameSignInPage
