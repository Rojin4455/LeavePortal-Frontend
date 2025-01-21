import axios from 'axios';
import { store } from '../store/store';
import { setUser, clearUser, updateAccessToken } from '../slices/userSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const state = store.getState();
//     const refreshToken = state.user.refreshToken;

//     if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         try {
//           const token = await new Promise((resolve) => {
//             subscribeTokenRefresh((token) => {
//               resolve(token);
//             });
//           });
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return axiosInstance(originalRequest);
//         } catch (error) {
//           return Promise.reject(error);
//         }
//       }

//       isRefreshing = true;

//       try {
//         const { data } = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
//           { refresh_token: refreshToken }
//         );
//         const path = window.location.pathname;
//         const userType = path.trim().startsWith('/admin')
//         ? "admin"
//         : path.trim().startsWith('/user')
//         ? "user"
//         : "manager";
      
//         store.dispatch(setUser({
//           accessToken: data.access_token,
//           refreshToken: data.refresh_token,
//           userName:data.user.first_name,
//           userType: userType,
//         }));

//         originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
        
//         onTokenRefreshed(data.access_token);
        
//         isRefreshing = false;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         refreshSubscribers = [];
        
//         store.dispatch(clearUser());
        
//         const currentPath = window.location.pathname;
//         if (currentPath.startsWith('/admin')) {
//           toast.error('Session expired. Please login again.');
//           return Promise.reject({ redirect: '/admin/login' });
//         } else if (currentPath.startsWith('/manager')) {
//           toast.error('Invalid user');
//           return Promise.reject({ redirect: '/manager/login' });
//         } else {
//           return Promise.reject({ redirect: '/' });
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      
      // Check if error response exists
      if (!error.response) {
          return Promise.reject(error);
      }

      // Handle refresh token endpoint failure
      if (originalRequest.url?.includes('/auth/token/refresh/')) {
          store.dispatch(clearUser());
          toast.warning('Your session has expired');
          return Promise.reject(error);
      }

      // Handle 401 errors and token refresh
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
              const state = store.getState();
              const refreshToken = state.user.refreshToken;
              const { data } = await axiosInstance.post('/auth/token/refresh/',{
                refresh:refreshToken,
              });
              
              // Update store and original request with new token
              store.dispatch(updateAccessToken(data.access));
              originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
              
              // Retry the original request with new token
              return axiosInstance(originalRequest);
          } catch (refreshError) {
              // If refresh token fails, clear user and reject
              store.dispatch(clearUser());
              toast.warning('Your session has expired. Please login again.');
              return Promise.reject(refreshError);
          }
      }

      // Handle all other errors
      return Promise.reject(error);
  }
);

export default axiosInstance;