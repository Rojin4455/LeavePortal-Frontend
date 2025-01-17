import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../slices/adminContent';

function SideBar() {
    const menuItems = [
        { name: 'Dashboard'},
        { name: 'Add Departments'},
        {name: 'Add Leave Type'},
        { name: 'Users List'},
       
      ];

      const contentName = useSelector((state)=> state.adminContent.contentName)

      const dispatch = useDispatch()
    
      return (
        <nav className="w-64 bg-primary text-gray-300 h-screen p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  
                  className={`block p-2 rounded hover:bg-secondary hover:text-primary ${contentName === item.name ? 'bg-secondary text-black' : ""} `}
                  onClick={() => {dispatch(setContent({contentName:item.name}))}}
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>

      )
}

export default SideBar