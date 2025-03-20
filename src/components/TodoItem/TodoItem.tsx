import { FunctionComponent, useState } from 'react';
import styles from './TodoItem.module.scss';
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import delete_icon from '../../assets/delete-svgrepo-com.svg'
import { TitleLength, Todo } from '../../types';
import { deleteTodo, setTodoIsDone, updateTodo } from '../../api';
import { Form } from '../../ui/Form';
import { Input, Button } from 'antd';

interface TodoItemProps {
    todo: Todo
    loadFilteredTodos: () => void
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({ todo, loadFilteredTodos }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.title)

    const handleEditClick = () => {
        setIsEditing(true)
        setEditText(todo.title)
    }

    const handleToggleIsDone = async () => {
        try {
            await setTodoIsDone(todo.id, { isDone: !todo.isDone })
            loadFilteredTodos()
        } catch (error) {
            console.log('Failed to set todo is done:', error)
            throw error
        }
    }

    const handleUpdateTodo = async () => {
        if (editText === todo.title) return
        try {
            await updateTodo(todo.id, { title: editText })
            setIsEditing(false)
            loadFilteredTodos()

        } catch (error) {
            console.log('Failed to update todo:', error)
            throw error
        }
    }

    const handleCancelClick = () => {
        setEditText(todo.title)
        setIsEditing(false)
    }

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(todo.id)
            loadFilteredTodos()
        } catch (error) {
            console.log('Failed to delete todo:', error)
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
                {isEditing ? <Input
                    type="text"
                    value={editText}
                    minLength={TitleLength.MIN}
                    maxLength={TitleLength.MAX}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.editInput}
                    autoFocus
                />
                    : <span className={`${styles.todoTitle} ${todo.isDone ? styles.completed : ''}`}>{todo.title}</span>
                }
            </div>
            <div className={styles.buttonContainer}>
                {isEditing ? (
                    <Form onSubmit={handleUpdateTodo}>
                        <Button type="primary" htmlType="submit" className={styles.buttonSave}>
                            ✔
                        </Button>
                        <Button type="default" className={styles.buttonCancel} onClick={handleCancelClick}>
                            ✖
                        </Button>
                    </Form>
                ) : (
                    <>
                        <Button type='primary' className={styles.buttonUpdate} onClick={handleEditClick}>
                            <img className={styles.editIcon} src={edit_icon} alt='edit-icon' />
                        </Button>
                        <Button className={styles.buttonDelete} onClick={handleDeleteTodo}>
                            <img className={styles.deleteIcon} src={delete_icon} alt='edit-icon' />
                        </Button>
                    </>
                )}
            </div>
        </li>
    )
}
