import React, { useState } from 'react'
import Alert from './Alert'

const Login = () => {
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
        // const json = response.json();
        if (response.ok) {
            console.log("Loggedin succesfully");
            setCredentials({
                Email: "",
                password: ""
            })
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
        <div className="w-50 container mx-10 my-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="Email">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleInputChange} name='Email' value={credentials.Email} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleInputChange} name='password' value={credentials.password} />
                </div>
                <div className='container text-center'>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
