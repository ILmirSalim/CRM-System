import { FunctionComponent } from 'react'
import './App.scss'
import { AppRoutes } from './components/Routes/Routes';
import { Navigation } from './components/Navigation/Navigation';

export const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Navigation />
      <AppRoutes />
    </div>
  )
}
