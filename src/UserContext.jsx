/**
 * Context for user.
 * Data shared across application.
 */

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [token, setToken] = localStorage.getItem("token");
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")));


    // sync token with local storage when it changes 
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token])

    // sync currentUser with localStorage when it changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser])

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ token, setToken, currentUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>

    )
}

export { UserProvider }
export default UserContext;