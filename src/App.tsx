import { FunctionComponent } from 'react'
import { TodoList } from './pages/TodoList/TodoList'
import './App.scss'

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      <TodoList />
    </div>
  )
}
