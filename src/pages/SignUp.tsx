import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { signUpWithEmail } from '@/remote/auth'
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
} from '@/utils/validate'

function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })
  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  })

  const emailValidationResult = isTouched.email && validateEmail(formData.email)
  const passwordValidationResult =
    isTouched.password && validatePassword(formData.password)
  const passwordMatchValidationResult =
    isTouched.confirmPassword &&
    validatePasswordMatch(formData.password, formData.confirmPassword)
  const nicknameValidationResult =
    isTouched.nickname && validateNickname(formData.nickname)

  const isFormValid =
    !(
      emailValidationResult &&
      passwordValidationResult &&
      passwordMatchValidationResult &&
      nicknameValidationResult
    ) &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.nickname

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
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
        <div>
          <label>
            이메일
            <input
              type="email"
              name="email"
              placeholder="이메일"
              onChange={handleInput}
              onBlur={handleBlur}
            />
            {emailValidationResult && (
              <span>{emailValidationResult.message}</span>
            )}
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
              onBlur={handleBlur}
            />
            {passwordValidationResult && (
              <span>{passwordValidationResult.message}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            비밀번호 확인
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              onChange={handleInput}
              onBlur={handleBlur}
            />
            {passwordMatchValidationResult && (
              <span>{passwordMatchValidationResult.message}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            닉네임
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              onChange={handleInput}
              onBlur={handleBlur}
            />
            {nicknameValidationResult && (
              <span>{nicknameValidationResult.message}</span>
            )}
          </label>
        </div>

        <button type="submit" disabled={!isFormValid}>
          가입 완료
        </button>
      </form>
    </>
  )
}

export default SignUpPage
