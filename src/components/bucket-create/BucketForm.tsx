import { categoryList } from '@/constants/data'
import { useState } from 'react'
import TodoForm from './TodoForm'
import { BucketFormData } from '@/models/bucket'

interface BucketFormProps {
  onSubmit: (value: BucketFormData) => void
}

function BucketForm({ onSubmit }: BucketFormProps) {
  const [formData, setFormData] = useState<BucketFormData>({
    title: '',
    category: '',
    dueDate: '',
    todos: [],
  })

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeTodos = (todos: string[]) => {
    setFormData({
      ...formData,
      todos,
    })
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form action="submit" onSubmit={handleSubmitForm}>
      <input
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChangeValue}
      />

      <div>
        {categoryList.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={formData.category === category}
              onChange={handleChangeValue}
            />
            {category}
          </label>
        ))}
      </div>

      <input
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChangeValue}
      />

      <TodoForm onChangeTodos={handleChangeTodos} />

      <button type="submit">생성</button>
    </form>
  )
}

export default BucketForm
