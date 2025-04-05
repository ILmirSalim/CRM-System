import { Route, Routes } from 'react-router-dom';
import { Profile } from '../../pages/Profile/Profile';
import { TodoList } from '../../pages/TodoList/TodoList';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/todos" element={<TodoList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<TodoList />} />
        </Routes>
    )
}