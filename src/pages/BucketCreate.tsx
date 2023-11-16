import { useNavigate } from 'react-router-dom'
import useCreateBucket from '@/hooks/useCreateBucket'
import BucketForm from '@/components/bucket-create/BucketForm'
import { BucketFormData } from '@/models/bucket'

function BucketCreatePage() {
  const navigate = useNavigate()

  const { mutate: createBucket } = useCreateBucket()

  const handleSubmitForm = (value: BucketFormData) => {
    createBucket(value, {
      onSuccess: () => {
        navigate('/')
      },
      onError: () => {
        // error
      },
    })
  }

  return (
    <div>
      <h1>버킷 추가하기</h1>

      <BucketForm onSubmit={handleSubmitForm} />
    </div>
  )
}

export default BucketCreatePage
