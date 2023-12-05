import { BucketFormData } from '@/models/bucket'
import { createBucket } from '@/remote/bucket'
import { useMutation } from '@tanstack/react-query'

function useCreateBucket() {
  return useMutation((formData: BucketFormData) =>
    createBucket({
      title: formData.title,
      createDate: new Date(),
      dueDate: new Date(formData.dueDate),
      userID: 0, // FIXME: 희지 로그인 연동 후, 수정
      todos: formData.todos.map((todo) => ({
        title: todo,
        isCompleted: false,
      })),
    }),
  )
}

export default useCreateBucket
