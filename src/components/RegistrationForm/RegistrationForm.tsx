import { FunctionComponent } from 'react'
import { Button, Form, Input, Checkbox } from 'antd';
import formLogo from '../../assets/regForm_logo.svg'
import styles from './RegistrationForm.module.scss'

export const RegistrationForm: FunctionComponent = () => {
    const onFinish = () => {
        console.log('Received values of form: ');
    };

    return (
        <div className={styles.formContainer}>
            <img className={styles.formLogoIcon} src={formLogo} alt="" />
            <div className={styles.formWrapper}>
                <div className={styles.textForm}>
                    <span className={styles.firstRow}>
                        Login to your Account
                    </span>
                    <span className={styles.secondRow}>
                        See what is going on with your business
                    </span>
                </div>
                <Form
                    className={styles.formStyle}
                    name="registration_form"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        E-mail
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        Password
                        <Input.Password placeholder="Password" />
                    </Form.Item>
{/* 
                    <Form.Item> */}
                        <Button className={styles.formButton} type="primary" htmlType="submit">
                            Registration
                        </Button>
                    {/* </Form.Item> */}
                    <div className={styles.checkboxWrapper}>
                        <div>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className={styles.checkbox}></Checkbox>
                            </Form.Item>
                            <span className={styles.rememberMeText}>Remember me</span>
                        </div>
                        <div>
                            <span className={styles.forgotPasswordText}>Forgot Password?</span>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
