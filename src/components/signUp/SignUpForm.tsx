import { useState } from 'react'

import { checkIsEmailDuplicated, signUpWithEmail } from '@/remote/auth'
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
} from '@/utils/validate'
import useSignIn from '@/hooks/useSignIn'

interface formData {
  [key: string]: {
    value: string
    isInvalid: boolean
    isTouched: boolean
  }
}
interface Validators {
  [key: string]: (
    value: string,
    confirmPassword?: string,
  ) => { message: string } | undefined
}

const validators: Validators = {
  nickname: validateNickname,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validatePasswordMatch,
}

function SignUpForm() {
  const [formData, setFormData] = useState<formData>({})
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false)
  const [showEmailMessage, setShowEmailMessage] = useState(false)
  const { handleSubmit } = useSignIn({
    signInFunction: signUpWithEmail,
    params: [
      formData.email?.value,
      formData.password?.value,
      formData.nickname?.value,
    ],
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let isInvalid = false

    const validator = validators[name]
    if (validator) {
      const result = validator(
        value,
        name === 'confirmPassword' ? formData.password.value : undefined,
      )
      isInvalid = !!result
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value,
        isInvalid,
        isTouched: false,
      },
    }))
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        isTouched: true,
      },
    }))
  }

  const checkDuplicate = async () => {
    try {
      const email = formData.email?.value
      const duplicated = await checkIsEmailDuplicated(email)
      setIsEmailDuplicated(duplicated)
      setShowEmailMessage(true)
    } catch (error) {
      alert(error)
    }
  }

  const getErrorMessage = (
    field: string,
    value: string,
    confirmPassword?: string,
  ) => {
    return (
      formData[field]?.isInvalid &&
      formData[field].isTouched &&
      validators[field](value, confirmPassword)?.message
    )
  }

  const isFormValid = () => {
    const allFieldsExist = Object.keys(validators).every((key) => formData[key])

    return (
      allFieldsExist &&
      !isEmailDuplicated &&
      Object.values(formData).every((field) => !field.isInvalid && field.value)
    )
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
          {getErrorMessage('email', formData.email?.value) && (
            <span>{getErrorMessage('email', formData.email?.value)}</span>
          )}
          <button
            type="button"
            onClick={checkDuplicate}
            disabled={!formData.email?.value || !!formData.email?.isInvalid}
          >
            중복 확인
          </button>
          <span>
            {showEmailMessage &&
            formData.email?.isTouched &&
            !formData.email?.isInvalid
              ? isEmailDuplicated
                ? '이미 사용 중인 이메일이에요.'
                : '사용할 수 있는 이메일이에요.'
              : null}
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
          </label>
          {getErrorMessage('password', formData.password?.value) && (
            <span>{getErrorMessage('password', formData.password?.value)}</span>
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
          {getErrorMessage(
            'confirmPassword',
            formData.password?.value,
            formData.confirmPassword?.value,
          ) && (
            <span>
              {getErrorMessage(
                'confirmPassword',
                formData.password?.value,
                formData.confirmPassword?.value,
              )}
            </span>
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
          {getErrorMessage('nickname', formData.nickname?.value) && (
            <span>{getErrorMessage('nickname', formData.nickname?.value)}</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid()}>
          가입 완료
        </button>
      </form>
    </>
  )
}

export default SignUpForm
