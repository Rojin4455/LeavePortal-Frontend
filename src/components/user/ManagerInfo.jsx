import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';

function ManagerInfo() {
  const [managerInfo, setManagerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagerInfo = async () => {
      try {
        const response = await axiosInstance.get('users/manager-info/');
        setManagerInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching manager info");
        setLoading(false);
      }
    };

    fetchManagerInfo();
  }, []);

  console.log("manager info: ", managerInfo)

  if (loading) return <div className="text-center text-lg font-medium text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
        Manager Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-24 font-semibold text-gray-700">Name:</span>
          <span className="text-gray-800">{managerInfo.first_name} {managerInfo.last_name}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 font-semibold text-gray-700">Email:</span>
          <span className="text-gray-800">{managerInfo.email}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 font-semibold text-gray-700">Dep:</span>
          <span className="text-gray-800">{managerInfo.department_name || 'N/A'}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 font-semibold text-gray-700">Role:</span>
          <span className="text-gray-800 capitalize">{managerInfo.user_type}</span>
        </div>
      </div>
    </div>
  );
}

export default ManagerInfo;
