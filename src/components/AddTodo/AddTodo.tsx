import { FunctionComponent, useState } from 'react';
import './AddTodo.scss'
import { addTodo } from '../../api';

interface AddTodoProps {
  loadFilteredTodos: () => void
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ loadFilteredTodos }) => {
  const [title, setTitle] = useState('')

  const handleAddTodo = async (title: string) => {
    await addTodo(title)
    loadFilteredTodos()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.length >= 2 && title.length <= 64) {
      handleAddTodo(title)
      setTitle('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Task To Be Done"
        className='input-addTodo'
        minLength={2}
        maxLength={64}
        required
      />
      <button type="submit" className='button-submit'>Add</button>
    </form>
  )
}