import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import axiosInstance from '../../axios/axiosConfig';
import { setUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const AdminLoginPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
        const response = await axiosInstance.post('users/admin/login/', {
            username,
            password,
        });

        const { access, refresh } = response.data.tokens;
        dispatch(setUser({accessToken:access,refreshToken:refresh, userType:'admin', useName:'admin'}))
        
        navigate('/admin/dashboard');
        } catch (err) {
        console.error('Login error:', err);
        setError('Invalid username or password. Please try again.');
        }
    };




  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 bg-primary">
      <h1 className="text-white text-2xl font-bold">
  LeaveEase <span className="text-orange-300 font-thin font-sans ml-2 text-lg">Admin</span>
</h1>
      </header>
      
      <div className="flex-grow flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6">Welcome Admin</h2>

    {error && <p className="text-red-500 mb-4">{error}</p>}

    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <input
          type="username"
          placeholder="Enter username"
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition duration-200 text-lg"
          value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition duration-200 text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition duration-200"
      >
        Continue
      </button>
    </form>


    <div className="mt-6 space-y-4 space-between">
      <button className="w-full gap-2 text-black py-3 rounded-full text-lg font-medium hover:bg-secondary transition duration-200 flex items-center justify-center"
      onClick={() => navigate('/manager/login')}
        >
            <GrUserAdmin/>
        Are you manager?
      </button>

    </div>


  </div>
</div>

    
    </div>
  );
};

export default AdminLoginPage;

