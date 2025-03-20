import { FunctionComponent } from 'react'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Navigation: FunctionComponent = () => {
    const navigate = useNavigate()
    const onMenuClick = ({ key }: { key: string }) => {
        navigate(key)
    }

    return (
        <div className="navigation">
            <Menu
                mode="vertical"
                defaultSelectedKeys={['/todos']}
                onClick={onMenuClick}
                style={{ position: 'fixed', left: 0, height: '100%', overflow: 'auto' }}
            >
                <Menu.Item key="/todos">
                    <span>Список задач</span>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <span>Профиль</span>
                </Menu.Item>
            </Menu>

        </div>

    )
}
