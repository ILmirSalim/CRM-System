import { FunctionComponent } from 'react';
import styles from './AddTodo.module.scss'
import { addTodo } from '../../api';
import { Input, Button, Form } from 'antd';
import { TitleLength } from '../../types';

interface AddTodoProps {
  loadFilteredTodos: () => void
  isLoading: boolean
}

interface AddValue {
  title: string
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ loadFilteredTodos, isLoading }) => {
  const [form] = Form.useForm()
  
  const handleSubmit = async (value: AddValue) => {
    const { title } = value
    try {
      await addTodo(title)
      loadFilteredTodos()
      form.resetFields()
    } catch (error) {
      console.log('Failed to add todo:', error)
    }
  }

  const isButtonDisabled = isLoading

  return (
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
          { min: TitleLength.MIN, message: `Title must be at least ${TitleLength.MIN} characters!` },
          { max: TitleLength.MAX, message: `Title must be no more than ${TitleLength.MAX} characters!` },
        ]}
      >
        <Input
          placeholder="Task To Be Done"
          autoFocus
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={isButtonDisabled}
          type="primary"
          htmlType="submit"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  )
}