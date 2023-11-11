import { formatDate } from '@/utils/date'
import ListItem from '../shared/ListRow'
import { Bucket } from '@/models/bucket'

// TODO: 희지 이 데이터는 더미 데이터로 firebase 연동을 마치면 삭제합니다.
const dummyBuckets: Bucket[] = [
  {
    id: 0,
    title: '한라산 등반',
    createDate: new Date().toString(),
    dueDate: new Date().toString(),
    userID: 0,
    thumbnailImageURL: 'http://via.placeholder.com/52x52',
    todos: [
      {
        id: 1000,
        title: '헬스하기',
        isCompleted: false,
      },
    ],
  },
  {
    id: 1,
    title: '책 10권 읽기',
    createDate: new Date().toString(),
    dueDate: new Date().toString(),
    userID: 0,
    thumbnailImageURL: 'http://via.placeholder.com/52x52',
    todos: [
      {
        id: 1001,
        title: '서점 방문',
        isCompleted: true,
      },
    ],
  },
]

function BucketList() {
  return (
    <section>
      {dummyBuckets.map((bucket) => (
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
    </section>
  )
}

export default BucketList
