import { FunctionComponent } from 'react';
import './TodoFilters.scss';
import { FilterType, Todo } from '../../App';

interface TodoFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  todos: Todo[]
}

export const TodoFilters: FunctionComponent<TodoFiltersProps> = ({ filter, setFilter, todos }) => {
  const totalAllTodos = todos.length
  const totalEndTodos = todos.filter((todo) => todo.isDone).length
  const totalInProgressTodos = todos.filter((todo) => !todo.isDone).length

  return (
    <div className="todo-filters">
      <button
        onClick={() => setFilter(FilterType.ALL)}
        className={`filter-button ${filter === FilterType.ALL ? 'active' : ''}`}
      >
        {`Все (${totalAllTodos})`}
      </button>
      <button
        onClick={() => setFilter(FilterType.IN_WORK)}
        className={`filter-button ${filter === FilterType.IN_WORK ? 'active' : ''}`}
      >
        {`В работе (${totalInProgressTodos})`}
      </button>
      <button
        onClick={() => setFilter(FilterType.COMPLETED)}
        className={`filter-button ${filter === FilterType.COMPLETED ? 'active' : ''}`}
      >
        {`Сделано (${totalEndTodos})`}
      </button>
    </div>
  )
}