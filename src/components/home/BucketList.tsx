import { formatDate } from '@/utils/date'
import ListItem from '../shared/ListRow'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getBuckets } from '@/remote/bucket'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../shared/Loading'

function BucketList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['buckets'],
    queryFn: ({ pageParam }) => getBuckets(pageParam),
    getNextPageParam: (lastSnapshot) => lastSnapshot.lastVisible,
  })

  const buckets = data?.pages.flatMap((page) => page.buckets)

  const handleLoadMore = () => {
    if (!hasNextPage || isFetching) return

    fetchNextPage()
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      next={handleLoadMore}
      loader={<Loading />}
      dataLength={buckets?.length ?? 0}
    >
      <ul>
        {buckets?.map((bucket) => (
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
                <span>{formatDate(bucket.dueDate)}</span>
                <ListItem.ListItemText text={bucket.title} />
                {bucket.todos.map((todo) => (
                  <div key={todo.title}>
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
