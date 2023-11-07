import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import reportWebVitals from '@/reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './components/shared/RouteError'
import Layout from './components/shared/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'buckets',
        element: (
          <div>
            <span>Buckets</span>
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
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
