import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { checkEmailDuplication, signUpWithEmail } from '@/remote/auth'
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
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean | null>(
    null,
  )

  const emailValidationResult = isTouched.email && validateEmail(formData.email)
  const emailDuplicationResult = isTouched.email && isEmailDuplicated
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

    if (name === 'email' && isEmailDuplicated !== null) {
      setIsEmailDuplicated(null)
    }
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }))
  }

  const handleCheckDuplicate = async () => {
    const { email } = formData
    const duplicated = await checkEmailDuplication(email)
    setIsEmailDuplicated(duplicated)
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
            {(isTouched.email || isEmailDuplicated !== null) && (
              <span>
                {emailValidationResult && emailValidationResult.message}
              </span>
            )}
          </label>
          <button
            type="button"
            onClick={handleCheckDuplicate}
            disabled={!formData.email || !!emailValidationResult}
          >
            중복 확인
          </button>

          <span>
            {emailDuplicationResult
              ? '이미 사용 중인 이메일이에요.'
              : isEmailDuplicated === false
              ? '사용할 수 있는 이메일이에요.'
              : ''}
          </span>
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
