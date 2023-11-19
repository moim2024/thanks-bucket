import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/remote/firebase'

function SignInForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isError, setIsError] = useState<string | boolean>()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setIsError(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { email, password } = formData
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/buckets')
    } catch (error: any) {
      setIsError('존재하는 계정이 없거나 잘못된 비밀번호에요')
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이메일
            <input
              type="email"
              name="email"
              placeholder="이메일"
              onChange={handleInput}
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleInput}
            />
          </label>
        </div>
        {isError && <span>{isError}</span>}
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </>
  )
}

export default SignInForm
