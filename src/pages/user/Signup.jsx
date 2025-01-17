import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosConfig';
import { toast } from 'sonner';

const Signup = () => {


  const navigate = useNavigate();
  const [managers, setManagers] = useState([])
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    username:""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axiosInstance.get("users/user/get-managers/");
        setManagers(response.data);
        console.log("response.data: ",response.data) 
      } catch (er) {

        console.error("Error fetching Managers", er);
      }
    };
    fetchManagers();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match.";
    }
    if (!formData.manager) newErrors.manager = "Manager is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  formData.username = formData.email

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("users/user/signup/", formData);
      if (response.status === 201){

      
      console.log("user account creater:", response.data);
      toast.success("User account created successfully!")
      navigate("/");
      }
    } catch (error) {
      console.error("Error creating account:", error);
        
        toast.error("An unexpected error occurred.");
  
      setErrors({ server: "Failed to create an account. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 bg-primary">
        <h1 className="text-white text-2xl font-bold">LeaveEase</h1>
      </header>
      
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Create your account</h2>
          
          <form className="space-y-4"
          onSubmit={handleSubmit}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>
              
              
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                  value={formData.last_name}
                  name="last_name"
                  onChange={handleChange}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Create password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                value={formData.password2}
                onChange={handleChange}
                name="password2"
              />
              {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2}</p>
                )}
            </div>


            <div>
              <select
                name="manager"
                value={formData.id}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg bg-white appearance-none"
              >
                <option value="" disabled>
                  Select Manager
                </option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.first_name}
                  </option>
                ))}
              </select>
              {errors.manager && (
                <p className="text-red-500 text-sm">{errors.manager}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition duration-200"
            >
              Create Account
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
              Sign up with Google
            </button>
            
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button onClick={() => navigate('/')} className="text-primary font-medium hover:underline">
              Log in
            </button>
          </div>


          
        </div>
      </div>

    </div>
  );
};

export default Signup;

