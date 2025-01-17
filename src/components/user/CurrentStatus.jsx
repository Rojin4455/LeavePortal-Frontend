import React, {useEffect, useState} from 'react'
import { Calendar, CheckSquare, Clock } from 'lucide-react'
import axiosInstance from '../../axios/axiosConfig'

export default function CurrentStatus() {
    const [leaveDetails, setLeaveDetails] = useState([])
    const [leaveRequests, setLeaveRequests] = useState([])

    useEffect(() => {

        const fetchLeaveDetails = async () => {

            try{
                const response = await axiosInstance.get('leave/combined-leave-details/')
                if (response.status === 200){
                    console.log("success response: ", response)
                    setLeaveRequests(response.data.leaveRequests)
                    setLeaveDetails(response.data.leaveDetails)
                }else{
                    console.error("error response")
                }
            }catch(error){
                console.error("something went wrong: ", error)
            }

        }
        fetchLeaveDetails()

    },[])

  return (
    <div className="space-y-6">
    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Leave Balance</h3>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">15 days</p>
        <p className="mt-1 text-sm text-gray-500">Remaining this year</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">Last Leave</h3>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-900">Dec 24 - Dec 26</p>
        <p className="mt-1 text-sm text-gray-500">Christmas Vacation</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <CheckSquare className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">1</p>
        <p className="mt-1 text-sm text-gray-500">Awaiting approval</p>
      </div>
    </div> */}

    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Leave Requests</h3>
        <div className="space-y-4">
  {leaveRequests.map((request, index) => (
    <div
      key={index}
      className="flex flex-col p-4 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Days:</strong> {request.num_days}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Reason:</strong> {request.reason}
          </p>
        </div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold capitalize
            ${request.status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : request.status === 'APPROVED'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}
        >
          {request.status.toLowerCase()}
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
        <p>
          <strong>Leave Type ID:</strong> {request.leave_type}
        </p>
        <p>
          <strong>Requested On:</strong> {new Date(request.created_at).toLocaleDateString()}
        </p>
        {request.approved_by && (
          <p>
            <strong>Approved By:</strong> {request.approved_by}
          </p>
        )}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  </div>
  )
}
