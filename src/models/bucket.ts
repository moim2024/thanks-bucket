export interface Bucket {
  title: string
  createDate: Date
  dueDate: Date
  userID: number
  thumbnailImageURL?: string
  todos: Todo[]
}

export interface Todo {
  title: string
  isCompleted: boolean
}

export interface BucketFormData {
  title: string
  category: string
  dueDate: string
  todos: string[]
}
