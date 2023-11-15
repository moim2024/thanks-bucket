import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import reportWebVitals from '@/reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './components/shared/RouteError'
import Layout from './components/shared/Layout'
import HomePage from './pages/Home'
import TestPage from './pages/Test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BucketCreatePage from './pages/BucketCreate'
import SignInPage from './pages/SignIn'
import NicknameSignInPage from './pages/NicknameSignIn'
import SignOut from './components/shared/SignOut'
import SignUpPage from './pages/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signin/nickname',
        element: <NicknameSignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'buckets',
        element: (
          <div>
            <span>Buckets</span>
            <SignOut />
          </div>
        ),
      },
      {
        path: 'feed',
        element: (
          <div>
            <span>Feed</span>
          </div>
        ),
      },
      {
        path: 'test',
        element: <TestPage />,
      },
    ],
  },
  {
    path: '/bucket/create',
    element: <BucketCreatePage />,
  },
])

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
