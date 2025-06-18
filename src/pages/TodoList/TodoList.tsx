import { FunctionComponent, useEffect, } from 'react';

import styles from './TodoList.module.scss';
import { TodoFilters } from '../../components/TodoFilters/TodoFilters';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import spinner from '../../assets/tube-spinner.svg'
import { store } from '../../store';
import { observer } from 'mobx-react-lite';
import { Todolist } from '../../components/Todolist/Todolist';

export const TodoList: FunctionComponent = observer(() => {
    const { filter, loadFilteredTodos, isLoading } = store

    // export const TodoList: FunctionComponent = () => {
    //     const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
    //     const [isLoading, setIsLoading] = useState(false)
    // const [todos, setTodos] = useState<Todo[]>([])
    // const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    //     all: 0,ы
    //     completed: 0,
    //     inWork: 0
    // })

    // const loadFilteredTodos = useCallback(async () => {
    //     setIsLoading(true)
    //     try {
    //         const data = await fetchFilteredTodos(filter);
    //         setTodos(data.data)
    //         setTodoInfo(data.info)
    //     } catch (error) {
    //         console.log('Failed to loading todos:', error);
    //         throw error;
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }, [filter])

    useEffect(() => {
        loadFilteredTodos()
        const getCurrentTodos = setInterval(() => {
            loadFilteredTodos()
        }, 5000)

        return () => clearInterval(getCurrentTodos)
    }, [filter])

    return (
        <div className={styles.containerApp}>
            <AddTodo />
            <TodoFilters />
            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <img className={styles.spinner} src={spinner} alt='spinner' />
                </div>
            ) : (
                <Todolist />
            )}
        </div>
    )
})
