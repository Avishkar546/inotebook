import React, {useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    // useEffect(()=>{
    //     console.log(location)
    // },[location])

    return (
        // bg-body-tertiary
        <nav className="navbar navbar-expand-lg navbar bg-light text-danger">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'}?"active bg-primary":""`}  aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'}?"active bg-primary" :""`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex" >
                        <Link className="btn btn-outline-success mx-1" to="/login" role="button">Sign In</Link>
                        <Link className="btn btn-outline-success mx-1" to="/registration" role="button">Sign Up</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
