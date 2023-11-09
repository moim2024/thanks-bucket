import ListRow from '../shared/ListRow'
import ListRowText from '../shared/ListRowText'

interface Bucket {
  id: number
  title: string
  createDate: string
  dueDate: string
  userID: number
  thumbnailImageURL?: string
  todos: Todo[]
}

interface Todo {
  id: number
  title: string
  isCompleted: boolean
}

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
        <ListRow
          key={bucket.id}
          left={
            <img
              src={bucket.thumbnailImageURL}
              alt={`${bucket.title} 썸네일 이미지`}
            />
          }
          contents={
            <div>
              <span>{bucket.dueDate}</span>
              <ListRowText text={bucket.title} />
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
