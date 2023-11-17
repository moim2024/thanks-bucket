import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { signInWithEmail } from '@/remote/auth'

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
      await signInWithEmail(email, password)
      navigate('/buckets')
    } catch (error: any) {
      setIsError(error.message)
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
