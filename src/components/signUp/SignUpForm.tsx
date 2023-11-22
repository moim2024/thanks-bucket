import { useState } from 'react'

import { checkIsEmailUnique, signUpWithEmail } from '@/remote/auth'
import { checkValidate } from '@/utils/validate'
import useSignIn from '@/hooks/useSignIn'

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

  const [isEmailUnique, setIsEmailUnique] = useState({ message: '' })
  const [isCheckUniqueButtonClicked, setIsCheckUniqueButtonClicked] =
    useState(false)
  const errors = checkValidate(formValues)
  const { handleSubmit } = useSignIn({
    signInFunction: signUpWithEmail,
    params: [formValues.email, formValues.password, formValues.nickname],
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setIsCheckUniqueButtonClicked(false)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }))
    setIsCheckUniqueButtonClicked(false)
  }

  const checkUnique = async () => {
    try {
      const email = formValues.email
      const unique = await checkIsEmailUnique(email)
      setIsEmailUnique(unique)
      setIsCheckUniqueButtonClicked(true)
    } catch (error) {
      alert(error)
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
              onBlur={handleBlur}
            />
          </label>
          {isTouched.email && errors.email && (
            <span>{errors.email.message}</span>
          )}
          <button type="button" onClick={checkUnique}>
            중복 확인
          </button>
          {isTouched.email && !errors.email && isCheckUniqueButtonClicked && (
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

        <button type="submit">가입 완료</button>
      </form>
    </>
  )
}

export default SignUpForm
