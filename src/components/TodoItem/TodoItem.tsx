import { FunctionComponent, useState } from 'react';
import styles from './TodoItem.module.scss';
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import delete_icon from '../../assets/delete-svgrepo-com.svg'
import { Todo } from '../../types';
import { deleteTodo, setTodoIsDone, updateTodo } from '../../api';
import { Input, Button, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { NotificationError } from '../Notification/NotificationError';
import { TitleLength } from '../../constants';

interface TodoItemProps {
    todo: Todo
    loadFilteredTodos: () => void
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({ todo, loadFilteredTodos }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [form] = Form.useForm()

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleToggleIsDone = async () => {
        try {
            await setTodoIsDone(todo.id, { isDone: !todo.isDone })
            loadFilteredTodos()
        } catch (error) {
            console.log('Failed to set todo is done:', error)
            setErrorMessage('Failed to delete todo');
            throw error
        }
    }

    const handleUpdateTodo = async (values: { title: string }) => {
        if (values.title === todo.title) return
        try {
            await updateTodo(todo.id, { title: values.title })
            setIsEditing(false)
            loadFilteredTodos()
        } catch (error) {
            console.log('Failed to update todo:', error)
            setErrorMessage('Failed to update todo');
            throw error
        }
    }

    const handleCancelClick = () => {
        setIsEditing(false)
    }

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(todo.id)
            loadFilteredTodos()
        } catch (error) {
            console.log('Failed to delete todo:', error)
            setErrorMessage('Failed to delete todo');
            throw error
        }
    }

    return (
        <li className={styles.todoItem}>
            <div className={styles.checkboxContainer}>
                <label className={`${styles.container} ${todo.isDone ? styles.completed : ''}`}>
                    <Input type="checkbox" checked={todo.isDone} onChange={handleToggleIsDone} />
                    <span className={styles.checkmark}></span>
                </label>
                {isEditing ? (
                    <Form form={form} onFinish={handleUpdateTodo} initialValues={{ title: todo.title }}>
                        <Form.Item
                            name="title"
                            rules={[
                                { required: true, message: 'Title is required' },
                                { min: TitleLength.minLength, message: `Title must be at least ${TitleLength.minLength} characters` },
                                { max: TitleLength.maxLength, message: `Title must be no more than ${TitleLength.maxLength} characters` }
                            ]}
                        >
                            <Input autoFocus />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            <CheckOutlined />
                        </Button>
                        <Button type="default" onClick={handleCancelClick}>
                            <CloseOutlined />
                        </Button>
                    </Form>
                ) : (
                    <span className={`${styles.todoTitle} ${todo.isDone ? styles.completed : ''}`}>{todo.title}</span>
                )}
            </div>
            <div className={styles.buttonContainer}>
                {!isEditing &&
                    <>
                        <Button type="primary" onClick={handleEditClick}>
                            <img className={styles.editIcon} src={edit_icon} alt="edit-icon" />
                        </Button>
                        <Button color="danger" variant="solid" onClick={handleDeleteTodo}>
                            <img className={styles.deleteIcon} src={delete_icon} alt="delete-icon" />
                        </Button>
                    </>
                }
            </div>
            {errorMessage && (
                <NotificationError message={errorMessage} />
            )}
        </li>
    )
}
