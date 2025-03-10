import { FunctionComponent } from 'react';
import './TodoList.scss';

import { Todo, TodoRequest } from '../../App';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
    todos: Todo[]
    updateTodo: (id: number, updatedTodo: Partial<Todo>) => void
    deleteTodo: (id: number) => void
    title: string
    setTitle: (title: string) => void
    setTodoIsDone: (id: number, updatedTodo: TodoRequest) => void
    fetchFilteredTodos: () => void
}

export const TodoList: FunctionComponent<TodoListProps> = ({ todos, updateTodo, deleteTodo, title, setTitle, setTodoIsDone, fetchFilteredTodos }) => {
    return (
        <div className="todo-list">
            {todos && todos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                    title={title}
                    setTitle={setTitle}
                    setTodoIsDone={setTodoIsDone}
                    fetchFilteredTodos={fetchFilteredTodos} />
            ))}
            {!todos?.length && <p>Задач еще нет...</p>}
        </div>
    )
}