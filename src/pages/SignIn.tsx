import { Link } from 'react-router-dom'

import GoogleSignIn from '@/components/signup/GoogleSignIn'

function SignInPage() {
  return (
    <>
      <Link to={'/signin/nickname'}>버킷리스트 만들어보기</Link>{' '}
      <GoogleSignIn />
    </>
  )
}

export default SignInPage
