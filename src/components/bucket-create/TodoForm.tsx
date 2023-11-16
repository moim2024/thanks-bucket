import { useState } from 'react'

function TodoForm({
  onChangeTodos,
}: {
  onChangeTodos: (todos: string[]) => void
}) {
  const [todos, setTodos] = useState<string[]>([])

  const updateTodos = (newTodos: string[]) => {
    setTodos(newTodos)
    onChangeTodos(newTodos)
  }

  const handleAddTodo = () => {
    const newTodos = [...todos, '']

    updateTodos(newTodos)
  }

  const handleChangeTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newTodos = [...todos]
    newTodos[index] = e.target.value

    updateTodos(newTodos)
  }

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)

    updateTodos(newTodos)
  }

  return (
    <div>
      <button type="button" onClick={handleAddTodo}>
        투두 추가
      </button>

      {todos.map((todo, index) => (
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
