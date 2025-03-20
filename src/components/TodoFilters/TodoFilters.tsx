import { FunctionComponent } from 'react';
import styles from './TodoFilters.module.scss';
import { FilterType, TodoInfo } from '../../types';

interface TodoFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  todoInfo: TodoInfo
  isLoading: boolean
}

export const TodoFilters: FunctionComponent<TodoFiltersProps> = ({ filter, setFilter, todoInfo, isLoading }) => {

  const filterLabel: Record<FilterType, string> = {
    [FilterType.ALL]: 'Все',
    [FilterType.IN_WORK]: 'В работе',
    [FilterType.COMPLETED]: 'Сделано'
  }

  return (
    <div className={styles.todoFilters}>
      <button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.ALL)}
        className={`${styles.filterButton} ${filter === FilterType.ALL ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.ALL]} (${todoInfo.all})`}
      </button>
      <button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.IN_WORK)}
        className={`${styles.filterButton} ${filter === FilterType.IN_WORK ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.IN_WORK]} (${todoInfo.inWork})`}
      </button>
      <button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.COMPLETED)}
        className={`${styles.filterButton} ${filter === FilterType.COMPLETED ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.COMPLETED]} (${todoInfo.completed})`}
      </button>
    </div>
  )
}