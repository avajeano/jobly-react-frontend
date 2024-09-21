/**
 * Nav bar.
 */

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./UserContext";

function NavBar() {
    const { currentUser, logout } = useContext(UserContext)

    return (
        <nav>
            
            {currentUser ? (
                <>
                    <span style={{ color: "white"}}>Hi {currentUser.username}</span>
                    <NavLink to="/" end>Jobly</NavLink>
                    <NavLink to="/companies" end>Companies</NavLink>
                    <NavLink to="/jobs" end>Jobs</NavLink>
                    <NavLink to="/profile" end>Profile</NavLink>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/register" end>Register</NavLink>
                    <NavLink to="/login" end>Login</NavLink>
                </>
            )}
        </nav>
    );
}

export default NavBar;

{/* <NavLink to="/logout" end>Logout</NavLink> */}