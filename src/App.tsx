import { useState, useEffect, FunctionComponent } from 'react'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { TodoFilters } from './components/TodoFilters'
import './App.scss'

export interface Todo {
  id: number
  title: string
  created: string
  isDone: boolean
}

export interface TodoRequest {
  title?: string
  isDone?: boolean
}

export enum FilterType {
  ALL = 'all',
  IN_WORK = 'inWork',
  COMPLETED = 'completed',
}

export const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')

  const fetchAllTodos = async () => {
    const response = await fetch('https://easydev.club/api/v1/todos')
    const data = await response.json()
    setTodos(data.data)
  }

  const fetchFilteredTodos = async () => {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)
    const data = await response.json()
    setFilteredTodos(data.data)
  };

  const addTodo = async (title: string) => {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const newTodo = await response.json()

    setTodos(prev => [...prev, newTodo])
    setFilteredTodos(prev => filter === FilterType.ALL ? [...prev, newTodo] : prev)
    fetchFilteredTodos()
  }

  const setTodoIsDone = async (id: number, updatedTodo: TodoRequest) => {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    })

    const result = await response.json()

    setTodos(prev =>
      prev.map(todo => todo.id === id ? result : todo)
    )
    setFilteredTodos(prev =>
      prev.map(todo => todo.id === id ? result : todo)
    )

    fetchFilteredTodos()
  }

  const updateTodo = async (id: number, updatedTodo: TodoRequest) => {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    })

    const updated = await response.json()

    setTodos(prev =>
      prev.map(todo => todo.id === id ? updated : todo)
    )
    setFilteredTodos(prev =>
      prev.map(todo => todo.id === id ? updated : todo)
    )
  }

  const deleteTodo = async (id: number) => {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    })

    setTodos(prev => prev.filter(todo => todo.id !== id));
    setFilteredTodos(prev => prev.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    fetchAllTodos()
  }, [])

  useEffect(() => {
    fetchFilteredTodos()
  }, [filter])

  return (
    <div className="app">
      <AddTodo addTodo={addTodo} title={title} setTitle={setTitle} />
      <div className='containerApp'>
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          todos={todos} />

        <TodoList todos={filteredTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          title={title}
          setTitle={setTitle}
          setTodoIsDone={setTodoIsDone}
          fetchFilteredTodos={fetchFilteredTodos} />
      </div>
    </div>
  )
}
