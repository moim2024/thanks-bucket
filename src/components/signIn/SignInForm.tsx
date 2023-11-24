import { useState } from 'react'

import { validateEmail, validatePassword } from '@/utils/validate'
import useSignIn from '@/hooks/useSignIn'
import { FormValues } from '@/models/auth'

function SignInForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
  })
  const [submitError, setSubmitError] = useState({
    isError: false,
    message: '',
  })

  const handleSignIn = useSignIn({ setSubmitError })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    setSubmitError({
      isError: false,
      message: '',
    })
  }

  const checkValidate = (formValues: FormValues) => {
    let errors: { [key: string]: { message: string } } = {}

    if (formValues.email !== null) {
      const result = validateEmail(formValues.email)
      if (result) {
        errors.email = result
      }
    }
    if (formValues.password !== null) {
      const result = validatePassword(formValues.password)
      if (result) {
        errors.password = result
      }
    }

    return errors
  }

  const errors = checkValidate(formValues)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched({
      email: true,
      password: true,
    })
    if (Object.keys(errors).length === 0) {
      handleSignIn(formValues)
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
          {isTouched.email && errors.email && (
            <span>{errors.email.message}</span>
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
            />
          </label>
          {isTouched.password && errors.password && (
            <span>{errors.password.message}</span>
          )}
        </div>
        {submitError.isError && <span>{submitError.message}</span>}
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </>
  )
}

export default SignInForm
