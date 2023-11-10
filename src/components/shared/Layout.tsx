import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={'/signin'}>시작하기</Link>
          </li>
          <li>

            <Link to={'/buckets'}>마이 버킷</Link>
          </li>
          <li>
            <Link to={'/feed'}>피드</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
