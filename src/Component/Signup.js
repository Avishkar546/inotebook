import { React, useState } from 'react'
import { useAlert } from '../Context/Alert/AlertState'

const Signup = () => {
  const [credentials, setCredentials] = useState({ // To manage input values
    Name: "",
    Email: "",
    password: ""
  })

  const {showAlert} = useAlert(); 

  const handleSubmit = async (e) => { // On form submit
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Name:credentials.Name,Email: credentials.Email, password: credentials.password })
    })
    const json = response.json();
    if (response.ok) {
      console.log("Registered succesfully");
      setCredentials({
        Name: "",
        Email: "",
        password: ""
      })
      showAlert("success","Registered successfully");
    }
    else {
      showAlert("warning","Something went wrong");
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
          <label htmlFor="password">Name</label>
          <input type="text" className="form-control" id="username" placeholder="Enter Your Name" name='Name' value={credentials.Name} onChange={handleInputChange} />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name='Email' value={credentials.Email} onChange={handleInputChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={handleInputChange} />
        </div>
        <div className='container text-center'>
          <button type="submit" className="btn btn-primary ">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
