import { FunctionComponent, useState } from 'react';
import styles from './AddTodo.module.scss'
import { addTodo } from '../../api';
import { Form } from '../../ui/Form';
import { Input, Button } from 'antd';
import { TitleLength } from '../../types';
import { store } from '../../store';

interface AddTodoProps {
  loadFilteredTodos: () => void
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ loadFilteredTodos }) => {
  const [title, setTitle] = useState('')
  const { isLoading } = store

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
  const isButtonDisabled = isLoading || title.length < TitleLength.MIN || title.length > TitleLength.MAX
  return (
    <Form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <Input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Task To Be Done"
        minLength={TitleLength.MIN}
        maxLength={TitleLength.MAX}
        required
        autoFocus
        onPressEnter={handleSubmit}
      />
      <Button
        disabled={isButtonDisabled}
        type="primary"
        htmlType="submit"
      >
        Add
      </Button>
    </Form>
  )
}