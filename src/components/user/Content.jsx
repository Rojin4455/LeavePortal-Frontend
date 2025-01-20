import React from 'react'
import { useSelector } from 'react-redux'
import CurrentStatus from './CurrentStatus'
import AddLeaveRequest from './AddLeaveRequest';
import ManagerInfo from './ManagerInfo';

export default function Content({navItems}) {
    const contentName = useSelector((state) => state.userContent.contentName)
    const activeNavItem = navItems.find((item) => item.id === contentName);

  return (
    <main className="lg:pl-64 pt-16">
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
        {activeNavItem?.label || 'Unknown Section'}
        </h1>
        <p className="text-gray-500 mt-1">
          {contentName === 'current-status' && "Overview of your leave status and recent requests"}
          {contentName === 'add-leave' && "Submit a new leave request"}
          {contentName === 'settings' && "Manage your account settings"}
        </p>
      </div>

      {contentName === 'current-status' && <CurrentStatus/>}
      {contentName === 'manager-info' && <ManagerInfo/>}
      {contentName === 'add-leave' && <AddLeaveRequest/>}
      {contentName === 'settings' && <div>Settings Component</div>}
    </div>
  </main>
  )
}
