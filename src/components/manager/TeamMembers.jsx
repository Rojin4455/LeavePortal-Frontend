import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios/axiosConfig'

function TeamMembers() {
    const [employees, setEmployees] = useState([])

    useEffect(()=> {

        const fetchEmployees = async () => {
            try{
                const response = await axiosInstance.get('users/manager/get-employees/')
                if (response.status === 200) {
                    setEmployees(response.data)
                    console.log("response data:  ", response.data)
                }else{
                    console.error("error response: ", response)
                }
            }catch(error){
                console.error("error response: ", error)
            }
        }
        fetchEmployees()

    },[])

  return (
    <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             
              {employees.map(member => (
                <div
                  key={member}
                  className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-secondary rounded-full text-primary flex items-center justify-center font-bold">
                  {member.first_name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">{member.first_name} {member.last_name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default TeamMembers