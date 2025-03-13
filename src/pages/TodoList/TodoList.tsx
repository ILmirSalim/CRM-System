import { FunctionComponent } from 'react';
import './TodoList.scss';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { Todo } from '../../types';

interface TodoListProps {
    filteredTodos: Todo[]
    loadFilteredTodos: () => void
}

export const TodoList: FunctionComponent<TodoListProps> = ({ filteredTodos, loadFilteredTodos }) => {
    return (
        <div className="todo-list">
            {filteredTodos && filteredTodos?.map((todo) => (
                <TodoItem key={todo.id} 
                    todo={todo}
                    loadFilteredTodos={loadFilteredTodos}
                />
            ))}
            {!filteredTodos.length && <p>Задач еще нет...</p>}
        </div>
    )
}