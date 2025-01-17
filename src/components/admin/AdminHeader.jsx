import React, { useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slices/userSlice';
import { clearContent } from '../../slices/adminContent';

function AdminHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const navigate = useNavigate()
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try{
        const response = await axiosInstance.post('users/admin/logout/')
        if (response.status === 200) {
            console.log("response")
            dispatch(clearUser())
            dispatch(clearContent())
            navigate('/admin/login')
            
            closeModal();

        }else{
            console.log("error response: ", response)
        }
    }catch(error){
        console.log(error)

    }
  };

  return (
    <>
      <header className="bg-primary text-third p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={openModal}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center animate-spring justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 ">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
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
    </>
  );
}
export default AdminHeader;

