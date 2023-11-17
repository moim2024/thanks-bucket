import { useState } from 'react'

import { validateNickname } from '@/utils/validate'
import { signInWithNickname } from '@/remote/auth'
import useSignIn from '@/hooks/useSignIn'

function NicknameSignInPage() {
  const [nickname, setNickname] = useState('')
  const [isTouched, setIsTouched] = useState(false)
  const { handleSubmit } = useSignIn({
    signInFunction: signInWithNickname,
    params: [nickname],
  })

  const isNicknameInvalid = isTouched && validateNickname(nickname)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNickname(inputValue)
  }

  const handleBlur = () => {
    setIsTouched(true)
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
