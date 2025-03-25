import { FunctionComponent, useState } from 'react';
import styles from './AddTodo.module.scss'
import { addTodo } from '../../api';
import { Form } from '../../ui/Form';
import { TitleLength } from '../../types';

interface AddTodoProps {
  loadFilteredTodos: () => void
  isLoading: boolean
}

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
        minLength={TitleLength.MIN}
        maxLength={TitleLength.MAX}
        required
      />
      <button disabled={isLoading} type="submit" className={styles.buttonSubmit}>Add</button>
    </Form>
  )
}