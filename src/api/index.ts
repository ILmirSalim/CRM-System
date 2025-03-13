import { FilterType, Todo, TodoRequest } from "../types"

export const fetchAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos')
    const data = await response.json()
    return data.data as Todo[]
  } catch (error) {
    console.log('Failed to fetch all todos:', error)
    throw error
  }
}

export const fetchFilteredTodos = async (filter: FilterType): Promise<Todo[]> => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)
    const data = await response.json()
    return data.data as Todo[]
  } catch (error) {
    console.log('Failed to fetch filtered todos:', error)
    throw error
  }
}

export const addTodo = async (title: string): Promise<Todo> => {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const newTodo = await response.json()
    return newTodo
  } catch (error) {
    console.log('Failed to add todo:', error)
    throw error
  }
}

export const setTodoIsDone = async (id: number, updatedTodo: TodoRequest): Promise<Todo> => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log('Failed to update todo status:', error);
    throw error
  }
}

export const updateTodo = async (id: number, updatedTodo: TodoRequest): Promise<Todo> => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    })
    const updated = await response.json();
    return updated
  } catch (error) {
    console.log('Failed to update todo:', error)
    throw error
  }
}

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log('Failed to delete todo:', error)
    throw error
  }
}