import React from "react";
import {Route, Routes} from 'react-router-dom'
import UserLogin from "../pages/user/UserLogin";
import Signup from "../pages/user/Signup";
import UserDashboard from "../pages/user/UserDashboard";
import UserProtectedRoute from "./UserProtectedRoute";


function UserRoutes() {
    return (
<Routes>
    <Route path={"/"} element={<UserLogin/>}/>
    <Route path={'user/signup'} element={<Signup/>} />
    <Route path={'user/dashboard'} element={<UserProtectedRoute><UserDashboard/></UserProtectedRoute>} />
</Routes>
    )

}

export default UserRoutes