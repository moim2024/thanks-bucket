export interface Bucket {
  id: number
  title: string
  createDate: string
  dueDate: string
  userID: number
  thumbnailImageURL?: string
  todos: Todo[]
}

export interface Todo {
  id: number
  title: string
  isCompleted: boolean
}
