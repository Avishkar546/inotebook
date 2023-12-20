import React from 'react'
import { useAlert } from '../Context/Alert/AlertState';

const Alert = () => {
    const { Alert } = useAlert();

    if (!Alert) {
        return null;
    }

    const { type, message } = Alert;

    return (
        <div className="alert-container">
            <div className={`alert-${type}`}>
                <p>{message}</p>
            </div>
        </div>

    )
}

export default Alert
