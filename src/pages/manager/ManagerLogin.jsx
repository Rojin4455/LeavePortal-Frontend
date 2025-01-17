import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import axiosInstance from '../../axios/axiosConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { toast } from 'sonner';


const ManagerLogin = () => {
  const navigate = useNavigate()

    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
        const response = await axiosInstance.post('users/manager/login/', {
            username:email,
            password,
        });

        if (response.status === 200){

        const { access, refresh } = response.data.tokens;
        dispatch(setUser({accessToken:access,refreshToken:refresh, userType:'manager', userName:response.data.user.first_name }))
        toast.success("success")
        navigate('/manager/dashboard');
        }else{
          toast.error("invalid credentials")
        }

        
        
        } catch (err) {
        console.error('Login error:', err);
        toast.error("invalid credentials")
        setError('Invalid username or password. Please try again.');
        }
    };



  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 bg-primary">
      <h1 className="text-white text-2xl font-bold">
  LeaveEase <span className="text-orange-300 font-thin font-sans ml-2 text-lg">Manager</span>
</h1>
      </header>
      
      <div className="flex-grow flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6">Welcome Manager</h2>

    <form className="space-y-4"
    onSubmit={handleLogin}
    >
      <div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition duration-200 text-lg"
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
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
    <div className="mt-6 text-center">
      <span className="text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={() => navigate('/manager/signup')}
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </button>
      </span>
    </div>


    <div className="mt-6 space-y-4 space-between">
      <button className="w-full gap-2 text-black py-3 rounded-full text-lg font-medium hover:bg-secondary transition duration-200 flex items-center justify-center"
      onClick={() => navigate('/')}
        >
            <GrUserAdmin/>
        Are you user?
      </button>

    </div>


  </div>
</div>

    
    </div>
  );
};

export default ManagerLogin;

