import { FunctionComponent } from 'react';
import styles from './TodoList.module.scss';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { Todo } from '../../types';

interface TodolistProps {
    todos: Todo[]
    loadFilteredTodos: () => void
}

export const Todolist: FunctionComponent<TodolistProps> = ({ todos, loadFilteredTodos }) => {
    return (
        <ul className={styles.todolist}>
            {todos?.map((todo) => (
                <TodoItem key={todo.id}
                    todo={todo}
                    loadFilteredTodos={loadFilteredTodos}
                />
            ))}
            {!todos?.length && <p>Задач еще нет...</p>}
        </ul>
    )
}