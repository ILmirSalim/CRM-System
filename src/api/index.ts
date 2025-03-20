import axios, { AxiosResponse } from 'axios';
import { FilterType, MetaResponse, Todo, TodoRequest } from "../types"

const BASE_URL = 'https://easydev.club/api/v1'

export const fetchFilteredTodos = async (filter: FilterType): Promise<MetaResponse> => {
  try {
    const response: AxiosResponse<MetaResponse> = await axios.get(`${BASE_URL}/todos`, {
      params: { filter },
    })
    return response.data;
  } catch (error) {
    console.log('Failed to fetch filtered todos:', error)
    throw error
  }
}

export const addTodo = async (title: string): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.post(`${BASE_URL}/todos`, {
      title,
    })
    return response.data
  } catch (error) {
    console.log('Failed to add todo:', error)
    throw error
  }
}

export const setTodoIsDone = async (id: number, updatedTodo: TodoRequest): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${BASE_URL}/todos/${id}`, updatedTodo)
    return response.data
  } catch (error) {
    console.log('Failed to update todo status:', error)
    throw error
  }
}

export const updateTodo = async (id: number, updatedTodo: TodoRequest): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${BASE_URL}/todos/${id}`, updatedTodo)
    return response.data
  } catch (error) {
    console.log('Failed to update todo:', error)
    throw error
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`)
  } catch (error) {
    console.log('Failed to delete todo:', error)
    throw error
  }
}