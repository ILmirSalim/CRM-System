import { FunctionComponent, useState } from 'react';
import styles from './AddTodo.module.scss'
import { addTodo } from '../../api';
import { Form } from '../../ui/Form';

interface AddTodoProps {
  loadFilteredTodos: () => void
  isLoading: boolean
}

const MIN_TITLE_LENGTH = 2
const MAX_TITLE_LENGTH = 64

export const AddTodo: FunctionComponent<AddTodoProps> = ({ loadFilteredTodos, isLoading }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.length < 2) return
    if (title.length > 64) return
    
    try {
      await addTodo(title)
      loadFilteredTodos()
      setTitle('')
    } catch (error) {
      console.log('Failed to add todo:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Task To Be Done"
        className={styles.inputAddTodo}
        minLength={MIN_TITLE_LENGTH}
        maxLength={MAX_TITLE_LENGTH}
        required
      />
      <button disabled={isLoading} type="submit" className={styles.buttonSubmit}>Add</button>
    </Form>
  )
}