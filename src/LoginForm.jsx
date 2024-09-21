import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import API from "./api";

function LoginForm() {
    const initialState = {
        username: "",
        password: "",
    }
    const [formData, setFormData] = useState(initialState);
    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name] : value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // authenticate the user and get the token
            const token = await API.loginUser(formData);
            // stores token in the app state
            setToken(token);
            alert(`logged in as ${formData.username}`);
            navigate('/');
        }   catch (error) {
            console.error("login failed", error);
            alert("login failed, please check your credentials")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button>Login</button>
        </form>
    )
}

export default LoginForm;