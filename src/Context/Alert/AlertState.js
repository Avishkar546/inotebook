import React, { useState, createContext, useContext } from 'react'

const alertContext = createContext();

export const AlertState = ({ children }) => {
    const [Alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(()=>{
            hideAlert();
        },3000)
    }

    const hideAlert = () => {
        setAlert(null);
    }

    return (
        <alertContext.Provider value={{ Alert, hideAlert, showAlert }}>
            {children}
        </alertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(alertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
