import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './TodoList.module.scss';
import { FilterType, Todo, TodoInfo } from '../../types';
import { fetchFilteredTodos } from '../../api';
import { TodoFilters } from '../../components/TodoFilters/TodoFilters';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import spinner from '../../assets/tube-spinner.svg'
import { Todolist } from '../../components/Todolist/Todolist';

export const TodoList: FunctionComponent = () => {
    const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
    const [isLoading, setIsLoading] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({
        all: 0,
        completed: 0,
        inWork: 0
    })

    const loadFilteredTodos = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await fetchFilteredTodos(filter);
            setTodos(data.data)
            setTodoInfo(data.info)
        } catch (error) {
            console.log('Failed to loading todos:', error);
            throw error;
        } finally {
            setIsLoading(false)
        }
    }, [filter])

    useEffect(() => {
        loadFilteredTodos()
        const getCurrentTodos = setInterval(() => {
            loadFilteredTodos()
        }, 5000)

        return () => clearInterval(getCurrentTodos)
    }, [filter])

    return (
        <div className={styles.containerApp}>
            <AddTodo loadFilteredTodos={loadFilteredTodos} isLoading={isLoading} />
            <TodoFilters
                filter={filter}
                setFilter={setFilter}
                todoInfo={todoInfo}
                isLoading={isLoading}
            />
            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <img className={styles.spinner} src={spinner} alt='spinner' />
                </div>
            ) : (
                <Todolist todos={todos} loadFilteredTodos={loadFilteredTodos} />
            )}

        </div>
    )
}