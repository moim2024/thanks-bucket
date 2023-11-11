import { Bucket } from '@/models/bucket'
import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants'

export const getBuckets = async (pageParam?: QuerySnapshot<Bucket>) => {
  const bucketQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.BUCKET), limit(10))
      : query(
          collection(store, COLLECTIONS.BUCKET),
          limit(10),
          startAfter(pageParam),
        )

  const bucketSnapshot = await getDocs(bucketQuery)

  const lastVisible = bucketSnapshot.docs[bucketSnapshot.docs.length - 1]

  return {
    buckets: bucketSnapshot.docs.map((doc) => ({
      ...(doc.data() as Bucket),
      id: doc.id,
    })),
    lastVisible,
  }
}
