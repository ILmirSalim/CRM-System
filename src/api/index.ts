import { FilterType, MetaResponse, Todo, TodoRequest } from "../types"

const BASE_URL = 'https://easydev.club/api/v1'

export const fetchFilteredTodos = async (filter: FilterType): Promise<MetaResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${filter}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Failed to fetch filtered todos:', error)
    throw error
  }
}

export const addTodo = async (title: string): Promise<Todo> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
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
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
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
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
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
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log('Failed to delete todo:', error)
    throw error
  }
}