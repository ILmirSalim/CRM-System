import { FunctionComponent } from 'react';
import './Addtodo.scss'

interface AddTodoProps {
  addTodo: (title: string) => void
  title: string
  setTitle: (title: string) => void
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ addTodo, title, setTitle }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.length >= 2 && title.length <= 64) {
      addTodo(title)
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