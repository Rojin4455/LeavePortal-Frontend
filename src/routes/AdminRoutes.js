import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminDashBoardPage from '../pages/admin/AdminDashBoardPage'
import AdminProtectedRoute from './AdminProtectedRoute'

export default function AdminRoutes() {
  return (
    <Routes>
    <Route path={"/login"} element={<AdminLoginPage/>}/>
    <Route path={"/dashboard"} element={ <AdminProtectedRoute><AdminDashBoardPage/></AdminProtectedRoute>} />
    </Routes>
  )
}
