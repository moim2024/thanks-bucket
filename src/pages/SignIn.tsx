import { Link } from 'react-router-dom'

import SignInForm from '@/components/signIn/SignInForm'

function SignInPage() {
  return (
    <>
      <SignInForm />
      <Link to={'/signup'}>계정 만들기</Link>
    </>
  )
}

export default SignInPage
