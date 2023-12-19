import React from 'react'
import { useAlert } from '../Context/Alert/AlertState';
import styles from './Alert.module.css'

const Alert = () => {
    const { Alert } = useAlert();

    if (!Alert) {
        return null;
    }

    const { type, message } = Alert;

    return (
        <div className={styles.alert-container}>
            <div className={styles.alert-type}>
                <p>{message}</p>
            </div>
        </div>

    )
}

export default Alert
