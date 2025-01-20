import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import { toast } from 'sonner';

const ManagerSignUp = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    department: "",
    username:""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get("users/admin/get-departments/");
        setDepartments(response.data);
      } catch (er) {

        console.error("Error fetching departments", er);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required.";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters.";
    } else if (!/^[a-zA-Z]+$/.test(formData.first_name.trim())) {
      newErrors.first_name = "First name can only contain letters.";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    }else if (!/^[a-zA-Z]+$/.test(formData.last_name.trim())) {
      newErrors.last_name = "Last name can only contain letters.";
    }
    
    // Validate email
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    } else if (/[*]/.test(formData.email)) {
      newErrors.email = "Email cannot contain invalid characters like '*'.";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match.";
    }
    if (!formData.department) newErrors.department = "Department is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  formData.username = formData.email

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("users/manager/signup/", formData);
      if (response.status === 201){
      console.log("Account created:", response.data);
      navigate("/manager/login");
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
        <h1 className="text-white text-2xl font-bold">
          LeaveEase{" "}
          <span className="text-orange-300 font-thin font-sans ml-2 text-lg">
            Manager
          </span>
        </h1>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Create your account</h2>

          {errors.server && (
            <div className="text-red-500 text-sm mb-4">{errors.server}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password2"
                placeholder="Confirm password"
                value={formData.password2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg"
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm">{errors.password2}</p>
              )}
            </div>

            <div>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200 text-lg bg-white appearance-none"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">{errors.department}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition duration-200"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/manager/login")}
              className="text-primary font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSignUp;
