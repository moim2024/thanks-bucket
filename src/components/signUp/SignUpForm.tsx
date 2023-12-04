import { useState } from 'react'

import { getUserByEmail } from '@/remote/auth'
import { checkValidate } from '@/utils/validate'
import useSignUp from '@/hooks/useSignUp'

function SignUpForm() {
  const [formValues, setFormValues] = useState({
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
  const [emailStatus, setEmailStatus] = useState({
    isDuplicatedCheck: false,
    isAvailable: false,
    message: '',
  })
  const errors = checkValidate(formValues)
  const handleSignUp = useSignUp()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'email' || emailStatus.isAvailable) {
      setEmailStatus((prevData) => ({
        ...prevData,
        isDuplicatedCheck: false,
        message: '',
      }))
    }
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }))
  }

  const checkEmailAvailable = async () => {
    try {
      setEmailStatus((prevData) => ({
        ...prevData,
        isDuplicatedCheck: true,
      }))

      const user = await getUserByEmail(formValues.email)

      if (user) {
        setEmailStatus((prevData) => ({
          ...prevData,
          isAvailable: false,
          message: '이미 사용 중인 이메일이에요.',
        }))
      } else {
        setEmailStatus((prevData) => ({
          ...prevData,
          isAvailable: true,
          message: '사용할 수 있는 이메일이에요.',
        }))
      }
    } catch (error) {
      console.error(error) // 추후 수정
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched({
      email: true,
      password: true,
      confirmPassword: true,
      nickname: true,
    })

    if (emailStatus.isDuplicatedCheck === false) {
      setEmailStatus((prevData) => ({
        ...prevData,
        message: '이메일 중복을 확인해주세요.',
      }))
      return
    }

    if (
      errors.password ||
      errors.nickname ||
      errors.confirmPassword.isMatched === false ||
      emailStatus.isAvailable === false
    ) {
      return
    }

    handleSignUp(formValues)
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
          </label>
          {isTouched.email && errors.email && (
            <span>{errors.email.message}</span>
          )}
          <button
            type="button"
            onClick={checkEmailAvailable}
            disabled={!!errors.email}
          >
            중복 확인
          </button>
          {isTouched.email && !errors.email && (
            <span>{emailStatus.message}</span>
          )}
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
          </label>
          {isTouched.password && errors.password && (
            <span>{errors.password.message}</span>
          )}
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
          </label>
          {isTouched.confirmPassword && errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
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
          </label>
          {isTouched.nickname && errors.nickname && (
            <span>{errors.nickname.message}</span>
          )}
        </div>

        <button type="submit">가입 완료</button>
      </form>
    </>
  )
}

export default SignUpForm
