import { FunctionComponent } from 'react';
import styles from './TodoFilters.module.scss';
import { FilterType } from '../../types';
import { Button } from 'antd';
import { store } from '../../store';

export const TodoFilters: FunctionComponent = () => {
  const { filter, setFilter, isLoading, todoInfo } = store
  const filterLabel: Record<FilterType, string> = {
    [FilterType.ALL]: 'Все',
    [FilterType.IN_WORK]: 'В работе',
    [FilterType.COMPLETED]: 'Сделано'
  }

  return (
    <div className={styles.todoFilters}>
      <Button
        disabled={isLoading}
        type={filter === FilterType.ALL ? "primary" : "default"}
        onClick={() => setFilter(FilterType.ALL)}
      >
        {`${filterLabel[FilterType.ALL]} (${todoInfo.all})`}
      </Button>
      <Button
        disabled={isLoading}
        type={filter === FilterType.IN_WORK ? "primary" : "default"}
        onClick={() => setFilter(FilterType.IN_WORK)}
      >
        {`${filterLabel[FilterType.IN_WORK]} (${todoInfo.inWork})`}
      </Button>
      <Button
        disabled={isLoading}
        type={filter === FilterType.COMPLETED ? "primary" : "default"}
        onClick={() => setFilter(FilterType.COMPLETED)}
      >
        {`${filterLabel[FilterType.COMPLETED]} (${todoInfo.completed})`}
      </Button>
    </div>
  )
}