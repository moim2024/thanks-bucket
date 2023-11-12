import { useState } from 'react'
import { format } from 'date-fns'
import { createBucket } from '@/remote/bucket'
import { useNavigate } from 'react-router-dom'

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

const categoryList = [
  '건강',
  '학업',
  '여행',
  '커리어',
  '자기계발',
  '취미/여가',
  '연애',
  '가족',
  '일상/삶',
]

function BucketCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<BucketFormData>(
    defaultBucketFormData,
  )

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    })
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      category: e.target.value,
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
        createDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: format(formData.dueDate, 'yyyy-MM-dd'),
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
          onChange={handleChangeTitle}
        />

        <div>
          {categoryList.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={formData.category === category}
                onChange={handleChangeCategory}
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
