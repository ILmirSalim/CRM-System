import { FunctionComponent } from 'react';
import './TodoFilters.scss';
import { FilterType } from '../../types';

interface TodoFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  totalCountsTodos: {
    totalAllTodos: number,
    totalEndTodos: number,
    totalInProgressTodos:number,
  }
}

export const TodoFilters: FunctionComponent<TodoFiltersProps> = ({ filter, setFilter, totalCountsTodos }) => {
  return (
    <div className="todo-filters">
      <button
        onClick={() => setFilter(FilterType.ALL)}
        className={`filter-button ${filter === FilterType.ALL ? 'active' : ''}`}
      >
        {`Все (${totalCountsTodos?.totalAllTodos})`}
      </button>
      <button
        onClick={() => setFilter(FilterType.IN_WORK)}
        className={`filter-button ${filter === FilterType.IN_WORK ? 'active' : ''}`}
      >
        {`В работе (${totalCountsTodos?.totalInProgressTodos})`}
      </button>
      <button
        onClick={() => setFilter(FilterType.COMPLETED)}
        className={`filter-button ${filter === FilterType.COMPLETED ? 'active' : ''}`}
      >
        {`Сделано (${totalCountsTodos?.totalEndTodos})`}
      </button>
    </div>
  )
}