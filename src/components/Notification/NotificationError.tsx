import { FunctionComponent } from 'react';
import { Alert } from 'antd';

interface NotificationProps {
    message: string
    className?: string;
}

export const NotificationError: FunctionComponent<NotificationProps> = ({ message, className }) => {
    return (
        <Alert
            className={className}
            message={message}
            type="error"
            showIcon
        />
    )
}