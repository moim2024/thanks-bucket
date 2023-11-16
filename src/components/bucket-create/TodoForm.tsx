import { BucketFormData } from '@/models/bucket'

function TodoForm({
  formData,
  setFormData,
}: {
  formData: BucketFormData
  setFormData: React.Dispatch<React.SetStateAction<BucketFormData>>
}) {
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

  return (
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
  )
}

export default TodoForm
