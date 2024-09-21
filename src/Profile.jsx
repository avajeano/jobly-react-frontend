/** 
 * Logged in users can view and edit their information.
*/

import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import API from "./api";

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email
            });
        }
    }, [currentUser])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // update user information
            const updatedUser = await API.updateUser(formData.username, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
            setCurrentUser(updatedUser);
            alert("profile updated successfully")
        } catch (err) {
            setError("failed to update profile. please try again");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <button>Update Profile</button>
            </form>
        </div>
    )
}

export default Profile;