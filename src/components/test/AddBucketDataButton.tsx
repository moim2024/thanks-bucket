import { dummyBuckets } from '@/components/test/mock'
import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

export function AddBucketDataButton() {
  const handleAddBucketData = async () => {
    const batch = writeBatch(store)

    dummyBuckets.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.BUCKET))

      batch.set(docRef, card)
    })

    batch.commit().then(() => {
      window.alert('버킷 데이터 추가 완료!')
    })
  }

  return <button onClick={handleAddBucketData}>버킷 데이터 추가하기</button>
}
