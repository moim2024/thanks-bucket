import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    return 'Unknown error'
  }
}

function ErrorPage() {
  const error = useRouteError()
  const errorMessage = getErrorMessage(error)

  return (
    <div>
      <h1>Oops!</h1>
      <p>에러가 발생했습니다.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export default ErrorPage
