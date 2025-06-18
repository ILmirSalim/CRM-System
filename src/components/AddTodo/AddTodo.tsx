import React, { FunctionComponent, useState } from 'react';
import styles from './AddTodo.module.scss'
import { addTodo } from '../../api';
import { Input, Button, Form } from 'antd';
import { NotificationError } from '../Notification/NotificationError';
import { TitleLength } from '../../constants';
import { store } from '../../store';

interface TodoFormValues {
  title: string
}

const AddTodoComponent: FunctionComponent = () => {
  const { loadFilteredTodos, isLoading } = store
  const [error, setError] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (value: TodoFormValues) => {
    const { title } = value
    try {
      await addTodo(title)
      loadFilteredTodos()
      form.resetFields()
    } catch (error) {
      console.log('Failed to add todo:', error)

      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  return (
    <>
      <Form
        className={styles.addTodoForm}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name="title"
          className={styles.formInput}
          rules={[
            { required: true, message: 'Please input the task to be done!' },
            { min: TitleLength.minLength, message: `Title must be at least ${TitleLength.minLength} characters!` },
            { max: TitleLength.maxLength, message: `Title must be no more than ${TitleLength.maxLength} characters!` },
          ]}
        >
          <Input
            placeholder="Task To Be Done"
            autoFocus
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
      {error && <NotificationError message='Failed to add todo, try again' />}
    </>
  )
}

export const AddTodo = React.memo(AddTodoComponent)