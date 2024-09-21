import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./SignupForm.css";
import API from "./api";

function SignupForm() {
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState)
    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // registers user and gets the token
            const token = await API.registerUser(formData);
            // stores token in the app state
            setToken(token);
            alert(`created user ${formData.username}`);
            navigate('/');
            // reset form data
            setFormData(initialState);
        } catch (error) {
            console.error("singup failed", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input 
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input 
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={formData.lastName}
                    onChange={handleChange}/>
                </div>
                <div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange} />
                </div>
                <button>Register</button>
            </form>
        </>
    )
}

export default SignupForm;