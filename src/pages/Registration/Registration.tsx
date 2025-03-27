import { FunctionComponent } from 'react'
import imageLogo from "../../assets/imageForm.png"
import styles from './Registration.module.scss'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'

export const Registration: FunctionComponent = () => {

    return (
        <div className={styles.container}>
            <img className={styles.imageLogo} src={imageLogo} alt="image" />
            <RegistrationForm />
        </div>
    )
}
