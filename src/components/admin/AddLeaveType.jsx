import React,{useState, useEffect} from 'react'
import axiosInstance from '../../axios/axiosConfig';

function AddLeaveType() {
    const [leaveName, setLeaveName] = useState("");
  const [description, setDescription] = useState("");
  const [leaves, setLeaveTypes] = useState([]);
  const [days, setDays] = useState([])

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try{
        const response = await axiosInstance.get('leave/admin/get-leavetypes/')
        console.log(response.data)
        setLeaveTypes(response.data)
      }catch(er){
        console.error("something went wrong", er)
      }
    }
    fetchLeaveTypes()
  },[])



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leaveName.trim() || !description.trim()) return;

    try{
      const response = await axiosInstance.post('leave/admin/add-leavetype/',{
        name:leaveName,
        description:description,
        default_days:days,
      })
      if (response.status === 201) {
        console.log("created", response)
        setLeaveTypes([
          ...leaves,
          { id: response.data.id, name: leaveName, description },
        ]);
      } else{
        console.log("error response")
      }
    }catch(er){
      console.log("something went wrong: ", er)
    }

    setLeaveName("");
    setDescription("");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add Leave Type
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="leaveName"
                className="block text-gray-700 font-medium mb-1"
              >
                Leave Type
              </label>
              <input
                type="text"
                id="leaveName"
                value={leaveName}
                onChange={(e) => setLeaveName(e.target.value)}
                placeholder="Enter leave name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter leave description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
        <label
            htmlFor="days"
            className="block text-gray-700 font-medium mb-1"
        >
            Maximum Days
        </label>
        <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Enter the maximum number of days"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
        />
        </div>


            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondaryHover text-primary font-medium py-2 px-4 rounded-lg shadow-lg transition"
              >
                Add leave
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Leaves List
          </h2>
          {leaves.length > 0 ? (
            <ul className="space-y-4">
              {leaves.map((dept) => (
                <li
                  key={dept.id}
                  className="flex justify-between items-center bg-gray-50 border rounded-lg px-4 py-3"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600">{dept.description}</p>
                  </div>
                  {/* <button
                    onClick={() => handleDelete(dept.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Delete
                  </button> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              No leaves added yet. Add a leave to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddLeaveType