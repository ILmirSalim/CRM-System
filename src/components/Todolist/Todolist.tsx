import { FunctionComponent } from 'react';
import styles from './TodoList.module.scss';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { store } from '../../store';

export const Todolist: FunctionComponent = () => {
    const { todos, loadFilteredTodos } = store
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