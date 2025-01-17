import React,{useState, useEffect} from 'react'
import axiosInstance from '../../axios/axiosConfig';

function    UsersList() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    // const users = [
    //   { id: 1, name: 'John Doe', role: 'Manager' },
    //   { id: 2, name: 'Jane Smith', role: 'User' },
    //   { id: 3, name: 'Alice Johnson', role: 'Admin' },
    // ];

    const [users,setUsers] = useState([])


    useEffect(()=> {
        const fetchUsers = async () => {

            try{
            const response = await axiosInstance.get('users/fetch-all-users/')
            if (response.status === 200) {
                setUsers(response.data)
                console.log("response: ",response)
            }else{
                console.error("error response", response)
            }
        }catch(err){
            console.error("smething went wrong: ", err)
        }

        }
        fetchUsers()
    },[])
  
    const filteredUsers = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? user.user_type === filter : true)
    );
  
    return (
      <div className="bg-white rounded shadow p-6">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Roles</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-4 bg-gray-100 rounded shadow flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold">{user.email}</h3>
                <p className="text-gray-600">{user.user_type}</p>
              </div>
              <button className="text-primary hover:underline">Details</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default UsersList