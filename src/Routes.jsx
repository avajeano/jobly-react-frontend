import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import UserContext from "./UserContext";

// component for protected routes
const ProtectedRoute = ({ element, ...rest }) => {
    const { currentUser } = useContext(UserContext);

    return currentUser ? element : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/companies" element={<ProtectedRoute element={<CompanyList />} />} />
            <Route path="/companies/:handle" element={<ProtectedRoute element={<CompanyDetail />} />} />
            <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<SignupForm />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;