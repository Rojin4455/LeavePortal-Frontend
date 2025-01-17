import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosConfig";

function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try{
        const response = await axiosInstance.get('users/admin/get-departments/')
        console.log(response.data)
        setDepartments(response.data)
      }catch(er){
        console.error("something went wrong", er)
      }
    }
    fetchDepartments()
  },[])


  console.log("departments: ",departments)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departmentName.trim() || !description.trim()) return;

    try{
      const response = await axiosInstance.post('users/admin/add-department/',{
        name:departmentName,
        description:description,
      })
      if (response.status === 201) {
        console.log("created", response)
        setDepartments([
          ...departments,
          { id: response.data.id, name: departmentName, description },
        ]);
      } else{
        console.log("error response")
      }
    }catch(er){
      console.log("something went wrong: ", er)
    }

    setDepartmentName("");
    setDescription("");
  };

  // const handleDelete = (id) => {
  //   setDepartments(departments.filter((dept) => dept.id !== id));
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add Department
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="departmentName"
                className="block text-gray-700 font-medium mb-1"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter department name"
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
                placeholder="Enter department description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondaryHover text-primary font-medium py-2 px-4 rounded-lg shadow-lg transition"
              >
                Add Department
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Departments List
          </h2>
          {departments.length > 0 ? (
            <ul className="space-y-4">
              {departments.map((dept) => (
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
              No departments added yet. Add a department to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;
