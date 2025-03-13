import { useState, useEffect, FunctionComponent } from 'react'
import { TodoList } from './pages/TodoList/TodoList'
import { AddTodo } from './components/AddTodo/AddTodo'
import { TodoFilters } from './components/TodoFilters/TodoFilters'
import './App.scss'
import { fetchAllTodos, fetchFilteredTodos } from './api'
import { FilterType, Todo } from './types'

export const App: FunctionComponent = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [totalCountsTodos, setTotalCountsTodos] = useState({
    totalAllTodos: 0,
    totalEndTodos: 0,
    totalInProgressTodos: 0
  })

  const loadAllTodos = async () => {
    const data = await fetchAllTodos()
    setTotalCountsTodos({
      totalAllTodos: data.length,
      totalEndTodos: data.filter((todo) => todo.isDone).length,
      totalInProgressTodos: data.filter((todo) => !todo.isDone).length
    })
  }

  const loadFilteredTodos = async () => {
    const data = await fetchFilteredTodos(filter)
    loadAllTodos()
    setFilteredTodos(data)
  }

  useEffect(() => {
    loadAllTodos()
  }, [])

  useEffect(() => {
    loadFilteredTodos()
  }, [filter])

  return (
    <div className="app">
      <AddTodo loadFilteredTodos={loadFilteredTodos} />
      <div className='containerApp'>
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          totalCountsTodos={totalCountsTodos} />

        <TodoList 
          filteredTodos={filteredTodos}
          loadFilteredTodos={loadFilteredTodos}
        />
      </div>
    </div>
  )
}
