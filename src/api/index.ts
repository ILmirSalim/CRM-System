import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FilterType, MetaResponse, Todo, TodoInfo, TodoRequest } from "../types";

const BASE_URL = 'https://easydev.club/api/v1'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

export const fetchFilteredTodos = async (filter: FilterType): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response: AxiosResponse<MetaResponse<Todo, TodoInfo>> = await axiosInstance.get('/todos', {
      params: { filter },
    })
    return response.data
  } catch (error) {
    console.log('Failed to fetch filtered todos:', error)
    throw error
  }
}

export const addTodo = async (title: string): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.post('/todos', {
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
    const response: AxiosResponse<Todo> = await axiosInstance.put(`/todos/${id}`, updatedTodo)
    return response.data
  } catch (error) {
    console.log('Failed to update todo status:', error)
    throw error
  }
}

export const updateTodo = async (id: number, updatedTodo: TodoRequest): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axiosInstance.put(`/todos/${id}`, updatedTodo)
    return response.data
  } catch (error) {
    console.log('Failed to update todo:', error)
    throw error
  }
}

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/todos/${id}`)
  } catch (error) {
    console.log('Failed to delete todo:', error)
    throw error
  }
}