import { FunctionComponent } from 'react'
import imageLogo from "../../assets/imageForm.png"
import styles from './AuthPage.module.scss'
import { AuthForm } from '../../components/AuthForm/AuthForm'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'

export const AuthPage: FunctionComponent = () => {

    return (
        <div className={styles.container}>
            <img className={styles.imageLogo} src={imageLogo} alt="image" />
            <div className={styles.formWrapper}>
                {/* <AuthForm /> */}

            <RegistrationForm />
            </div>
        </div>
    )
}
