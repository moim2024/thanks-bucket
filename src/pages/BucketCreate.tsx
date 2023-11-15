import { useState } from 'react'
import { format } from 'date-fns'
import { createBucket } from '@/remote/bucket'
import { useNavigate } from 'react-router-dom'
import { categoryList } from '@/constants/data'

interface BucketFormData {
  title: string
  category: string
  dueDate: Date
  todos: string[]
}

const defaultBucketFormData: BucketFormData = {
  title: '',
  category: '',
  dueDate: new Date(),
  todos: [],
}

function BucketCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<BucketFormData>(
    defaultBucketFormData,
  )

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    })
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      dueDate: new Date(e.target.value),
    })
  }

  const handleAddTodo = () => {
    setFormData({
      ...formData,
      todos: [...formData.todos, ''],
    })
  }

  const handleChangeTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newTodos = [...formData.todos]
    newTodos[index] = e.target.value
    setFormData({
      ...formData,
      todos: newTodos,
    })
  }

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...formData.todos]
    newTodos.splice(index, 1)
    setFormData({
      ...formData,
      todos: newTodos,
    })
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createBucket({
        title: formData.title,
        createDate: new Date(),
        dueDate: formData.dueDate,
        userID: 0, // FIXME: 희지 로그인 연동 후, 수정
        todos: formData.todos.map((todo) => ({
          title: todo,
          isCompleted: false,
        })),
      })

      navigate(-1)
    } catch (err) {
      // error
    }
  }

  return (
    <div>
      <h1>버킷 추가하기</h1>

      <form action="submit" onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChangeValue(e, 'title')}
        />

        <div>
          {categoryList.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={formData.category === category}
                onChange={(e) => handleChangeValue(e, 'category')}
              />
              {category}
            </label>
          ))}
        </div>

        <input
          type="date"
          value={format(formData.dueDate, 'yyyy-MM-dd')}
          onChange={handleChangeDate}
        />

        <div>
          <button type="button" onClick={handleAddTodo}>
            투두 추가
          </button>

          {formData.todos.map((todo, index) => (
            <div key={index}>
              <input
                type="text"
                value={todo}
                onChange={(e) => handleChangeTodo(e, index)}
              />
              <button onClick={() => handleDeleteTodo(index)}>삭제</button>
            </div>
          ))}
        </div>

        <button type="submit">생성</button>
      </form>
    </div>
  )
}

export default BucketCreatePage
