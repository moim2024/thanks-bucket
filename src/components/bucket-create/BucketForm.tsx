import { categoryList } from '@/constants/data'
import { useState } from 'react'
import TodoForm from './TodoForm'
import { BucketFormData } from '@/models/bucket'

const defaultBucketFormData: BucketFormData = {
  title: '',
  category: '',
  dueDate: '',
  todos: [],
}

interface BucketFormProps {
  onSubmit: (value: BucketFormData) => void
}

function BucketForm({ onSubmit }: BucketFormProps) {
  const [formData, setFormData] = useState<BucketFormData>(
    defaultBucketFormData,
  )

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        type="date"
        value={formData.dueDate}
        onChange={handleChangeValue}
      />

      <TodoForm formData={formData} setFormData={setFormData} />

      <button type="submit">생성</button>
    </form>
  )
}

export default BucketForm
