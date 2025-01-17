import React from 'react';
import LeaveRequests from './LeaveRequests';
import { useSelector } from 'react-redux';
import TeamMembers from './TeamMembers';

const Content = ({ selectedOption }) => {
    const contentName = useSelector((state)=> state.managerContent.contentName)

  const renderContent = () => {
    switch (contentName) {
        case 'users':
            return <TeamMembers/>
        case 'requests':
            return <LeaveRequests/>
        case 'reports':
            return <h2 className="text-xl font-bold text-gray-700">Reports Section</h2>;
        case 'settings':
            return <h2 className="text-xl font-bold text-gray-700">Settings Section</h2>;
    
      default:
        return <h2 className="text-xl font-bold text-gray-700">Select an option from the sidebar.</h2>;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default Content;
