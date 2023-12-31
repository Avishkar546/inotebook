import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAlert } from '../Context/Alert/AlertState';

const Login = () => {
    let navigation = useNavigate();

    const { showAlert } = useAlert();

    const [credentials, setCredentials] = useState({ // To manage input values
        Email: "",
        password: ""
    })

    const handleSubmit = async (e) => { // On form submit
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Email: credentials.Email, password: credentials.password })
        })
        const json = await response.json();
        if (response.ok) {
            localStorage.setItem('token', json.token); //Store the authtoken in localstorage

            navigation("/"); // Navigate to home route
            setCredentials({
                Email: "",
                password: ""
            })
            showAlert("success", "Logged in succesfully");
        }
        else {
            showAlert("warning", "Login Failed Provide valid credentials");
        }
    }

    const handleInputChange = (e) => { // Take the input values
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };
    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <label htmlFor="username">Username:</label>
                <input type="email" id="username" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleInputChange} name='Email' value={credentials.Email} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" onChange={handleInputChange} name='password' value={credentials.password} required />

                <button type="submit">Sign In</button>
                <div className="link-to-login">
                    <p>Don't have an account? <Link to="/registration">Register here</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login
