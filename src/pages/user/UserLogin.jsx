import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { toast } from 'sonner';
import axiosInstance from '../../axios/axiosConfig';
import { GrUserAdmin } from 'react-icons/gr';

const UserLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('users/user/login/', {
        username: email,
        password,
      });

      if (response.status === 200) {
        const { access, refresh, user } = response.data.tokens;

        console.log("userL :",response.data)
        dispatch(setUser({ accessToken: access, refreshToken: refresh, userType: 'user', userName:response.data.user.first_name }));
        toast.success('Login successful');
        navigate('/user/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Invalid credentials');
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 bg-primary">
        <h1 className="text-white text-2xl font-bold">LeaveEase</h1>
      </header>
      
      <div className="flex-grow flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6">What's your email and password?</h2>

    <form className="space-y-4" onSubmit={handleLogin}>
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

    <div className="mt-6 flex items-center justify-center">
      <span className="bg-gray-300 h-px flex-grow"></span>
      <span className="px-4 text-sm text-gray-500">or</span>
      <span className="bg-gray-300 h-px flex-grow"></span>
    </div>

    <div className="mt-6 space-y-4">
      <button className="w-full bg-gray-100 text-primary py-3 rounded-full text-lg font-medium hover:bg-secondary transition duration-200 flex items-center justify-center">
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Continue with Google
      </button>

    </div>

    {/* Sign Up Button */}
    <div className="mt-6 text-center">
      <span className="text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={() => navigate('/user/signup')}
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </button>
      </span>
    </div>


    <div className="mt-6 space-y-4 space-between">
      <button className="w-full gap-2 text- py-3 rounded-full text-lg font-medium bg-fifth hover:bg-secondary transition duration-200 flex items-center justify-center"
      onClick={()=> navigate('/manager/login')}
      >
            <GrUserAdmin/>
        Sign in Manager Portal
      </button>

    </div>


  </div>
</div>

    
    </div>
  );
};

export default UserLogin;

