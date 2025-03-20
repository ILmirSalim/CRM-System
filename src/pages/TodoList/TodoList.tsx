import { FunctionComponent, useEffect, useState } from 'react';
import styles from './TodoList.module.scss';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { FilterType, MetaResponse } from '../../types';
import { fetchFilteredTodos } from '../../api';
import { TodoFilters } from '../../components/TodoFilters/TodoFilters';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import spinner from '../../assets/tube-spinner.svg'

export const TodoList: FunctionComponent = () => {
    const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
    const [isLoading, setIsLoading] = useState(false)
    const [metaData, setMetaData] = useState<MetaResponse>({
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0
        },
        meta: {
            totalAmount: 0
        }
    })

    const loadFilteredTodos = async () => {
        setIsLoading(true)
        try {
            const data = await fetchFilteredTodos(filter);
            setMetaData(data);
        } catch (error) {
            console.log('Failed to loading todos:', error);
            throw error;
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        loadFilteredTodos()
    }, [filter])

    return (
        <div className={styles.containerApp}>
            <AddTodo loadFilteredTodos={loadFilteredTodos} isLoading={isLoading} />
            <TodoFilters
                filter={filter}
                setFilter={setFilter}
                todoInfo={metaData?.info}
                isLoading={isLoading}
            />
            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <img className={styles.spinner} src={spinner} alt='spinner' />
                </div>
            ) : (
                <ul className={styles.todoList}>
                    {metaData?.data.map((todo) => (
                        <TodoItem key={todo.id}
                            todo={todo}
                            loadFilteredTodos={loadFilteredTodos}
                        />
                    ))}
                    {!metaData?.data?.length && <p>Задач еще нет...</p>}
                </ul>
            )}

        </div>
    )
}