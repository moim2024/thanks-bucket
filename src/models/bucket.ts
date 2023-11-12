export interface Bucket {
  title: string
  createDate: string // yyyy-MM-dd
  dueDate: string // yyyy-MM-dd
  userID: number
  thumbnailImageURL?: string
  todos: Todo[]
}

export interface Todo {
  title: string
  isCompleted: boolean
}
