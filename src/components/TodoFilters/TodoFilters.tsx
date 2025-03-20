import { FunctionComponent } from 'react';
import styles from './TodoFilters.module.scss';
import { FilterType, TodoInfo } from '../../types';
import { Button } from 'antd';
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
      <Button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.ALL)}
        className={`${styles.filterButton} ${filter === FilterType.ALL ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.ALL]} (${todoInfo.all})`}
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.IN_WORK)}
        className={`${styles.filterButton} ${filter === FilterType.IN_WORK ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.IN_WORK]} (${todoInfo.inWork})`}
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => setFilter(FilterType.COMPLETED)}
        className={`${styles.filterButton} ${filter === FilterType.COMPLETED ? styles.active : ''}`}
      >
        {`${filterLabel[FilterType.COMPLETED]} (${todoInfo.completed})`}
      </Button>
    </div>
  )
}