/**
 * Home component.
 */

import React, { useContext } from "react";
import UserContext from "./UserContext";

function Home() {
    const { currentUser } = useContext(UserContext)
    return (
        <div>
            {currentUser ? (
                <p>Welcome, {currentUser.firstName} {currentUser.lastName}!</p>
            ) : (
                <p>Welcome, please login or register.</p>
            )}
        </div>
    );
}

export default Home;