import BucketList from '@/components/home/BucketList'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  const moveToCreateBucket = () => {
    navigate('/bucket/create')
  }

  return (
    <div>
      <h1>마이버킷</h1>

      <button onClick={moveToCreateBucket}>버킷 추가</button>
      <BucketList />
    </div>
  )
}

export default HomePage
