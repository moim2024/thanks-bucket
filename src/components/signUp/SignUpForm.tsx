import { useState } from 'react'

import { validateEmailAvailable } from '@/remote/auth'
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
} from '@/utils/validate'
import useSignUp from '@/hooks/useSignUp'
import { FormValues } from '@/models/auth'

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
    isAvailable: false,
    message: '',
  })
  const [clickEmailAvaliable, setClickEmailAvaliable] = useState({
    isClick: false,
    message: '',
  })

  const handleSignUp = useSignUp()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'email' || emailStatus.isAvailable) {
      setClickEmailAvaliable({
        isClick: false,
        message: '',
      })
    }
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setIsTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }))
  }

  const checkValidate = (formValues: FormValues) => {
    let errors: { [key: string]: { isMatched?: boolean; message: string } } = {}

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
    if (formValues.confirmPassword !== null) {
      const result = validatePasswordMatch(
        formValues.password,
        formValues.confirmPassword,
      )
      if (result) {
        errors.confirmPassword = result
      }
    }
    if (formValues.nickname !== null) {
      const result = validateNickname(formValues.nickname)
      if (result) {
        errors.nickname = result
      }
    }

    return errors
  }

  const errors = checkValidate(formValues)

  const checkEmailAvaliable = async () => {
    try {
      const available = await validateEmailAvailable(formValues.email)
      setEmailStatus(available)
      setClickEmailAvaliable((prevData) => ({
        ...prevData,
        isClick: true,
      }))
    } catch (error) {
      alert(error) // 추후 수정
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

    if (clickEmailAvaliable.isClick === false) {
      setClickEmailAvaliable((prevData) => ({
        ...prevData,
        message: '이메일 중복을 확인해주세요.',
      }))
      return
    }
    console.log(errors)
    if (
      errors.confirmPassword.isMatched === false ||
      emailStatus.isAvailable === false
    ) {
      return
    }

    const isFormFilled = Object.values(formValues).every(
      (value) => value !== '',
    )
    if (isFormFilled) {
      handleSignUp(formValues)
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
          <button
            type="button"
            onClick={checkEmailAvaliable}
            disabled={!!errors.email}
          >
            중복 확인
          </button>
          {isTouched.email &&
            !errors.email &&
            (clickEmailAvaliable.isClick ? (
              <span>{emailStatus.message}</span>
            ) : (
              <span>{clickEmailAvaliable.message}</span>
            ))}
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
          {formValues.password === '' && isTouched.password === false && (
            <span>최소 8자 이상이여야해요.</span>
          )}
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
          {formValues.nickname === '' && isTouched.nickname === false && (
            <span>한글, 영어 대/소문자, 숫자로 최대 8자까지 가능해요.</span>
          )}
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
