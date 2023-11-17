import { useNavigate } from 'react-router-dom'

interface SignInProps {
  signInFunction: (...args: any[]) => Promise<any>
  params: any[]
}

function useSignIn({ signInFunction, params }: SignInProps) {
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInFunction(...params)
      navigate('/buckets')
    } catch (error) {
      alert(error)
    }
  }
  return { handleSubmit }
}

export default useSignIn
