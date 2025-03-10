import { FunctionComponent, useState } from 'react';
import { Todo, TodoRequest } from '../../App';
import './TodoItem.scss';
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import delete_icon from '../../assets/delete-svgrepo-com.svg'

interface TodoItemProps {
    todo: Todo
    updateTodo: (id: number, updatedTodo: TodoRequest) => void
    deleteTodo: (id: number) => void
    title: string
    setTitle: (title: string) => void
    setTodoIsDone: (id: number, updatedTodo: TodoRequest) => void
    fetchFilteredTodos: () => void
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({ todo, updateTodo, deleteTodo, setTodoIsDone }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.title)

    const toggleIsDone = () => {
        setTodoIsDone(todo.id, { isDone: !todo.isDone })
    }

    const handleEditClick = () => {
        setIsEditing(true)
        setEditText(todo.title)
    }

    const handleSaveClick = () => {
        if (editText !== todo.title) {
            updateTodo(todo.id, { title: editText })
        }
        setIsEditing(false)
    }

    const handleCancelClick = () => {
        setEditText(todo.title)
        setIsEditing(false)
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
                        <button className='button-save' onClick={handleSaveClick}>
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
                        <button className='button-delete' onClick={() => deleteTodo(todo.id)}>
                            <img className='delete_icon' src={delete_icon} alt='edit-icon' />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
