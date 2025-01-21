import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  AlertCircle,
  FileText,
  CalendarDays,
  Clock,
  HelpCircle
} from 'lucide-react';
import axiosInstance from '../../axios/axiosConfig';
// import { current } from '@reduxjs/toolkit';
import { toast } from 'sonner';


const AddLeaveRequest = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);

  


  useEffect(()=> {
    const fetchUserLeaveTypes = async () => {

        try{
        const response = await axiosInstance.get('leave/get-user-leavebalance/')
        if (response.status === 200){

            console.log("response: ", response)
            setLeaveTypes(response.data)

        }else{
            console.error("error response: ", response)
        }
        }catch(er){
            console.error("something went wwrong: ", er)
        }
        
    }
    fetchUserLeaveTypes()
  },[])

  console.log("leaveTypes",leaveTypes)

  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    numDays: 0,
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'startDate' || name === 'endDate') {
      const otherDate = name === 'startDate' ? formData.endDate : formData.startDate;
      if (otherDate) {
        const days = calculateDays(
          name === 'startDate' ? value : formData.startDate,
          name === 'endDate' ? value : formData.endDate
        );
        setFormData(prev => ({
          ...prev,
          numDays: days
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    if (formData.reason && formData.reason.length < 10) {
      newErrors.reason = 'Reason should be at least 10 characters';
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date cannot be before start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const mappedData = {
        leave_type: formData.leaveType,
        start_date: formData.startDate,
        end_date: formData.endDate,
        num_days: formData.numDays,
        reason: formData.reason,        
      };
      try{
        const response = await axiosInstance.post('leave/user/request-leave/', {
            leave_type: formData.leaveType,
            start_date: formData.startDate,
            end_date: formData.endDate,
            num_days: formData.numDays,
            reason: formData.reason,
        })
        if (response.status === 201){
            console.log("Leave Request Added", response)
            toast.success('Leave Request is submitted!');
            setFormData({
                leaveType: '',
                startDate: '',
                endDate: '',
                numDays: 0,
                reason: ''
              })


        }else{
            console.error("error response : ", response)
        }
      }catch(error){
        if (error.status === 400){
            toast.error(error.response.data.errors.date_range)
        }
        console.error("something went wrong: ", error)
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {leaveTypes.map(type => (
          <div key={type.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">{type.leave_type.name}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{type.remaining_days}</p>
            <p className="text-sm text-gray-500">days remaining</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">New Leave Request</h2>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-gray-500 hover:text-gray-700"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {showHelp && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">How to request leave:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Select your leave type and dates</li>
                <li>• Provide a detailed reason for your leave</li>
                <li>• Submit at least 3 days in advance for planned leaves</li>
                <li>• Medical certificates may be required for sick leave</li>
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                  ${errors.leaveType ? 'border-red-300' : 'border-gray-200'}`}
              >
                <option value="">Select leave type</option>
                {leaveTypes.map(type => (
                  <option key={type.leave_type.id} value={type.leave_type.id}>
                    {type.leave_type.name} ({type.remaining_days} days remaining)
                  </option>
                ))}
              </select>
              {errors.leaveType && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.leaveType}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Start Date
    </label>
    <div className="relative">
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
        min={new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0]}
        className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
          ${errors.startDate ? 'border-red-300' : 'border-gray-200'}`}
      />
      <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
    {errors.startDate && (
      <p className="mt-1 text-sm text-red-500 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {errors.startDate}
      </p>
    )}
  </div>

  {/* End Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      End Date
    </label>
    <div className="relative">
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
        min={formData.startDate
          ? new Date(new Date(formData.startDate).setDate(new Date(formData.startDate).getDate() + 1))
              .toISOString()
              .split("T")[0]
          : new Date().toISOString().split("T")[0]} 
        className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
          ${errors.endDate ? 'border-red-300' : 'border-gray-200'}`}
      />
      <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
    {errors.endDate && (
      <p className="mt-1 text-sm text-red-500 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {errors.endDate}
      </p>
    )}
  </div>
</div>


            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Duration
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {formData.numDays} days
                </span>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Leave
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                  ${errors.reason ? 'border-red-300' : 'border-gray-200'}`}
                placeholder="Please provide a detailed reason for your leave request..."
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.reason}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-blue-200 transition-colors font-medium flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveRequest;