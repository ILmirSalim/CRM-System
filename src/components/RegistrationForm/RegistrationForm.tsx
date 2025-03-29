import { FunctionComponent } from 'react'
import { Button, Form, Input } from 'antd';
import formLogo from '../../assets/regForm_logo.svg'
import styles from './RegistrationForm.module.scss'
import { UserRegistration } from '../../types';
import axios from 'axios';

const BASE_URL = 'https://easydev.club/api/v1/auth/signup'

export const RegistrationForm: FunctionComponent = () => {
    const onFinish = async (values: UserRegistration) => {
        try {
            const response = await axios.post(BASE_URL, values);
            console.log('Регистрация успешна:', response.data);

        } catch (error) {
            console.error('Регистрация не удалась:', error);

        }
    };

    return (
        <div className={styles.formContainer}>
            <img className={styles.formLogoIcon} src={formLogo} alt="" />
            <div className={styles.formWrapper}>
                <div className={styles.textForm}>
                    <span className={styles.firstRow}>
                        Registration to your Account
                    </span>
                    <span className={styles.secondRow}>
                        See what is going on with your business
                    </span>
                </div>
                <Form
                    className={styles.formStyle}
                    name="registration"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="login"
                        label="Login"
                        rules={[
                            { required: true, message: 'Please input your login!' },
                            { min: 2, message: 'Login must be at least 2 characters long!' },
                            { max: 60, message: 'Login must be no more than 60 characters long!' },
                            { pattern: /^[a-zA-Z]+$/, message: 'Login must contain only Latin letters!' },
                        ]}
                    >
                        <Input placeholder="login" />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                            { min: 1, message: 'Username must be at least 1 character long!' },
                            { max: 60, message: 'Username must be no more than 60 characters long!' },
                        ]}
                    >
                        <Input placeholder="username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters long!' },
                            { max: 60, message: 'Password must be no more than 60 characters long!' },
                        ]}
                    >

                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not a valid email!' },
                        ]}
                    >
                        <Input placeholder="email" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phonenumber"
                        rules={[
                            {
                                pattern: /^[78][0-9]{10}$/,
                                message: 'Please enter a valid Russian mobile phone number!'
                            },
                        ]}
                    >
                        <Input placeholder="phonenumber 79000000000 or 89000000000" />
                    </Form.Item>

                    <Button className={styles.formButton} type="primary" htmlType="submit">
                        Registration
                    </Button>
                </Form>
            </div>
        </div>
    );
};
