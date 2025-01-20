import React from 'react';
import { FaUsers, FaCog, FaChartLine, FaAddressBook } from 'react-icons/fa';
import { setContent } from '../../slices/managerContentSlice';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = () => {
  const options = [
    { id: 'users', label: 'Team Members', icon: <FaUsers /> },
    { id: 'requests', label: 'Requests', icon: <FaAddressBook /> },
    // { id: 'reports', label: 'Reports', icon: <FaChartLine /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
    
  ];

  const dispatch = useDispatch()

const contentName = useSelector((state)=>state.managerContent.contentName)

  return (
    <aside className=" w-64 h-full">
      <div className="py-6 px-4">
        <h2 className="text-lg font-bold text-gray-700">Navigation</h2>
        <ul className="mt-6 space-y-4">
          {options.map(option => (
            <li
              key={option.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200 transition ${contentName === option.id? `bg-primary hover:bg-primaryhover text-fifth` : "" } `}
              onClick={() => dispatch(setContent({contentName:option.id}))}
            >
              {option.icon}
              <span className={`text-gray-800 font-medium ${contentName === option.id? ` text-white` : "text-gray-800" }  `}>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
