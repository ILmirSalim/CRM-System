import { FunctionComponent, useState } from 'react';
import './TodoItem.scss';
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import delete_icon from '../../assets/delete-svgrepo-com.svg'
import { Todo } from '../../types';
import { deleteTodo, setTodoIsDone, updateTodo } from '../../api';

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

    const toggleIsDone = async () => {
        await setTodoIsDone(todo.id, { isDone: !todo.isDone })
        loadFilteredTodos()
    }

    const handleUpdateTodo = async () => {
        if (editText !== todo.title) {
            await updateTodo(todo.id, { title: editText })
        }
        setIsEditing(false)
        loadFilteredTodos()
    }

    const handleCancelClick = () => {
        setEditText(todo.title)
        setIsEditing(false)
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        loadFilteredTodos()
    }

    return (
        <div className="todo-item">
            <div className='checkbox-container'>
                <label className={`container ${todo.isDone ? 'completed' : ''}`}>
                    <input type="checkbox" checked={todo.isDone} onChange={toggleIsDone} />
                    <span className="checkmark"></span>
                </label>
                {isEditing ? <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    autoFocus
                />
                    : <span className={`todo-title ${todo.isDone ? 'completed' : ''}`}>{todo.title}</span>
                }
            </div>
            <div className='button-container'>
                {isEditing ? (
                    <>
                        <button className='button-save' onClick={handleUpdateTodo}>
                            ✔
                        </button>
                        <button className='button-cancel' onClick={handleCancelClick}>
                            ✖
                        </button>
                    </>
                ) : (
                    <>
                        <button className='button-update' onClick={handleEditClick}>
                            <img className='edit-icon' src={edit_icon} alt='edit-icon' />
                        </button>
                        <button className='button-delete' onClick={() => handleDeleteTodo(todo.id)}>
                            <img className='delete_icon' src={delete_icon} alt='edit-icon' />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
