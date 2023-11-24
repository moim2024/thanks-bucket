import { Link, Outlet } from 'react-router-dom'
import SignOut from './SignOut'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthProvider'

function Layout() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={'/buckets'}>마이 버킷</Link>
          </li>
          <li>
            <Link to={'/feed'}>피드</Link>
          </li>
          <li>
            {user ? <SignOut /> : <Link to={'/signin'}>로그인/회원가입</Link>}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
