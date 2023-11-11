import { formatDate } from '@/utils/date'
import ListItem from '../shared/ListRow'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getBuckets } from '@/remote/bucket'
import { QuerySnapshot } from 'firebase/firestore'
import { Bucket } from '@/models/bucket'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../shared/Loading'

function BucketList() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['buckets'],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam?: QuerySnapshot<Bucket> }) =>
      getBuckets(pageParam),
    getNextPageParam: (lastSnapshot) => lastSnapshot.lastVisible,
    initialPageParam: undefined,
  })

  const handleLoadMore = () => {
    if (!hasNextPage || isFetching) return

    fetchNextPage()
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      next={handleLoadMore}
      loader={<Loading />}
      dataLength={data?.pages.flatMap((page) => page.buckets).length ?? 0}
    >
      <ul>
        {data?.pages
          .flatMap((page) => page.buckets)
          .map((bucket) => (
            <ListItem
              key={bucket.id}
              left={
                <img
                  src={bucket.thumbnailImageURL}
                  alt={`${bucket.title} 썸네일 이미지`}
                />
              }
              contents={
                <div>
                  <span>{formatDate(new Date(bucket.dueDate))}</span>
                  <ListItem.ListItemText text={bucket.title} />
                  {bucket.todos.map((todo) => (
                    <div key={todo.id}>
                      <span>{todo.title}</span>
                    </div>
                  ))}
                </div>
              }
              right={<input type="checkbox" />}
            />
          ))}
      </ul>
    </InfiniteScroll>
  )
}

export default BucketList
