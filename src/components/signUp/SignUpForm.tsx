import { useState } from 'react'

import { checkIsEmailUnique } from '@/remote/auth'
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
  const [isEmailUnique, setIsEmailUnique] = useState({
    isUnique: false,
    message: '',
  })
  const [isCheckEmailUnique, setIsCheckEmailUnique] = useState(false)
  const errors = checkValidate(formValues)
  const handleSignUp = useSignUp()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setIsCheckEmailUnique(false)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }))
  }

  const checkUnique = async () => {
    try {
      const email = formValues.email
      const unique = await checkIsEmailUnique(email)
      setIsEmailUnique(unique)
      setIsCheckEmailUnique(true)
    } catch (error) {
      alert(error) // 추후 수정
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          <button type="button" onClick={checkUnique}>
            중복 확인
          </button>
          {isTouched.email && !errors.email && isCheckEmailUnique && (
            <span>{isEmailUnique.message}</span>
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

        <button
          type="submit"
          disabled={
            errors.confirmPassword.isMatched === false ||
            isEmailUnique.isUnique === false
          }
        >
          가입 완료
        </button>
      </form>
    </>
  )
}

export default SignUpForm
