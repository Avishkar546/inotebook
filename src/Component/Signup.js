import { React, useState } from 'react'
import { Link } from "react-router-dom";
import { useAlert } from '../Context/Alert/AlertState'

const Signup = () => {
  const [credentials, setCredentials] = useState({ // To manage input values
    Name: "",
    Email: "",
    password: ""
  })

  const { showAlert } = useAlert();

  const handleSubmit = async (e) => { // On form submit
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Name: credentials.Name, Email: credentials.Email, password: credentials.password })
    })
    const json = response.json();
    if (response.ok) {
      console.log("Registered succesfully");
      setCredentials({
        Name: "",
        Email: "",
        password: ""
      })
      showAlert("success", "Registered successfully");
    }
    else {
      showAlert("warning", "Something went wrong");
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
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create an Account</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Your Name" name='Name' value={credentials.Name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name='Email' value={credentials.Email} onChange={handleInputChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" name='password' value={credentials.password} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <button type="submit">Sign Up</button>
          </div>

          <div className="link-to-login">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup