import React,{useState} from 'react'
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearContent, setContent } from '../../slices/userContentSlice';
import { clearUser } from '../../slices/userSlice';
import axiosInstance from '../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({isMobileMenuOpen, navItems}) {


    
    const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const contentName = useSelector((state) => state.userContent.contentName)
  const navigate = useNavigate()


  const handleLogout = async () => {
    try{
        const response = await axiosInstance.post('users/admin/logout/')
        if (response.status === 200) {
            console.log("response")
            dispatch(clearUser())
            dispatch(clearContent())
            setIsModalOpen(false)
            navigate('/login')
            

        }else{
            console.log("error response: ", response)
        }
    }catch(error){
        console.log(error)

    }
  };

    console.log("nanv itemsss: ", navItems)
  return (
    <>
    {isModalOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center animate-spring justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 ">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 hover:bg-secondary text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    <aside
    className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 w-64 transition-transform duration-300 ease-in-out z-20 
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
  >
    <nav className="p-4 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            dispatch(setContent({contentName:item.id}))
          }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
            ${contentName === item.id
              ? 'bg-primary text-secondary'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}

      <button
        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-8"
        onClick={() => setIsModalOpen(true)}
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
      
    </nav>
  </aside>
  </>
  )
}
