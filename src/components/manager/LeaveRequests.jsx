import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Clock, 
  User, 
  Mail, 
  Calendar,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  History
} from 'lucide-react';
import axiosInstance from '../../axios/axiosConfig';
import { toast } from 'sonner';


const LeaveRequests = () => {

    const [requests, setRequests] = useState([]);

useEffect(() => {
    const fetchRequests = async () => {
        try{
            const response = await axiosInstance.get('leave/manager/leave-requests/')
            if (response.status === 200){
                console.log("success response: ", response.data)
                setRequests(response.data)
            }else{
                console.error("error response: ", response)
            }
        }catch(error){
            console.error("error: ", error)
        }
    }
    fetchRequests()
},[])


    


//   [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       department: 'Engineering',
//       position: 'Senior Developer',
//       startDate: '2025-01-15',
//       endDate: '2025-01-20',
//       reason: 'Family Event',
//       status: 'Pending',
//       leaveHistory: [
//         { period: 'Dec 2024', days: 3, reason: 'Personal' },
//         { period: 'Oct 2024', days: 2, reason: 'Medical' },
//         { period: 'Aug 2024', days: 5, reason: 'Vacation' },
//       ],
//       totalLeavesThisYear: 10,
//       remainingLeaves: 15,
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       email: 'janesmith@example.com',
//       department: 'Marketing',
//       position: 'Content Manager',
//       startDate: '2025-01-10',
//       endDate: '2025-01-12',
//       reason: 'Medical Leave',
//       status: 'Pending',
//       leaveHistory: [
//         { period: 'Nov 2024', days: 1, reason: 'Medical' },
//         { period: 'Sep 2024', days: 4, reason: 'Vacation' },
//       ],
//       totalLeavesThisYear: 5,
//       remainingLeaves: 20,
//     },
//   ]

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleAction = async (id, action) => {

    try{
        const response = await axiosInstance.put('leave/change-request-status/',{
            id:id,
            action:action
        })
        if(response.status === 200) {
            setRequests(prevRequests =>
                prevRequests.map(request =>
                  request.id === id ? { ...request, status: action } : request
                )
              );
              setShowDetails(false);
            toast.success("Leave Status Updated!")
            console.log("response success: ", response)
        }else{
            toast.error("Something Went Wrong!")

            console.log("error response")
        }
    }catch(error){
        console.error("error response: ", error)
    }


  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="w-4 h-4" />;
      case 'APPROVED':
        return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const RequestList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leave Requests</h2>
        <div className="text-sm text-gray-500">
          Showing {requests.length} requests
        </div>
      </div>
      
      {requests.map(request => (
        <div 
          key={request.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-6"
          onClick={() => {
            setSelectedRequest(request);
            setShowDetails(true);
          }}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{request.employee.email}</h3>
                  {/* <p className="text-sm text-gray-500">{request.department}</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{request.start_date} - {request.end_date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{request.reason}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                {getStatusIcon(request.status)}
                <span>{request.status}</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const RequestDetails = () => {
    if (!selectedRequest || !showDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Leave Request Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Employee Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedRequest.employee.first_name}</h3>
                      {/* <p className="text-sm text-gray-500">{selectedRequest.position}</p> */}
                      {/* <p className="text-sm text-gray-500">{selectedRequest.department}</p> */}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedRequest.employee.email}</span>
                    </div>
                    {/* <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Remaining Leaves: {selectedRequest.remainingLeaves} days</span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Leave Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Leave Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-medium">{selectedRequest.start_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date</span>
                      <span className="font-medium">{selectedRequest.end_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason</span>
                      <span className="font-medium">{selectedRequest.reason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leave History */}
              {/* <div className="bg-white rounded-lg border border-gray-200 p-6 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <History className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Leave History</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Previous leave requests from this year</p>
                <div className="space-y-4">
                  {selectedRequest.leaveHistory.map((history, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{history.period}</p>
                        <p className="text-sm text-gray-600">{history.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{history.days} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Action Buttons */}
              {selectedRequest.status === 'PENDING' && (
                <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => handleAction(selectedRequest.id, 'REJECTED')}
                    className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition flex items-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Request</span>
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest.id, 'APPROVED')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Request</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <RequestList />
      {showDetails && <RequestDetails />}
    </div>
  );
};

export default LeaveRequests;