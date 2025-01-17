import React from 'react'
import {Route, Routes} from 'react-router-dom'
import ManagerLogin from '../pages/manager/ManagerLogin'
import ManagerSignUp from '../pages/manager/ManagerSignUp'
import ManagerDashboard from '../pages/manager/ManagerDashboard'
import ManagerProtectedRoute from './ManagerProtectedRoute'

export default function ManagerRoutes() {
  return (
    <Routes>
    <Route path={"/login"} element={<ManagerLogin/>}/>
    <Route path={'/signup'} element={<ManagerSignUp/>} />
    <Route path={'/dashboard'} element={<ManagerProtectedRoute><ManagerDashboard/></ManagerProtectedRoute>} />
    </Routes>
  )
}
