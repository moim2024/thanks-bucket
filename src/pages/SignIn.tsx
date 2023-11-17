import SignInForm from '@/components/signIn/SignInForm'
import { Link } from 'react-router-dom'

function SignInPage() {
  return (
    <>
      <SignInForm />
      <Link to={'/signup'}>계정 만들기</Link>
      <Link to={'/signin/nickname'}>버킷리스트 만들어보기</Link>
    </>
  )
}

export default SignInPage
