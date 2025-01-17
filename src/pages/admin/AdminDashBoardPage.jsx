import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import UsersList from '../../components/admin/UsersList'
import { useSelector } from 'react-redux'
import AddDepartment from '../../components/admin/AddDepartment'
import AddLeaveType from '../../components/admin/AddLeaveType'


function AdminDashBoardPage() {

  const {contentName} = useSelector((state)=> state.adminContent)
  const renderContent = () => {
    switch (contentName) {
      case "Dashboard":
        return <UsersList />;
        case "Users List":
          return <UsersList />;

        case "Add Departments":
            return <AddDepartment />;
        case "Add Leave Type":
            return <AddLeaveType />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoardPage