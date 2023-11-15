import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { signUpWithEmail } from '@/remote/auth'

function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password, nickname } = formData
    await signUpWithEmail(email, password, nickname)
    navigate('/buckets')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          이메일
          <input
            type="email"
            name="email"
            placeholder="이메일"
            onChange={handleInput}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInput}
          />
        </label>
        <label>
          비밀번호 확인
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={handleInput}
          />
        </label>
        <label>
          닉네임
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            onChange={handleInput}
          />
        </label>
        <button type="submit">가입 완료</button>
      </form>
    </>
  )
}

export default SignUpPage
