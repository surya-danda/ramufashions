import axios from 'axios';

// IMPORTANT: Replace this with your actual backend URL when deploying.
// For Gitpod, you can find the server's URL from the "Ports" tab.
const API_URL = 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// We use an interceptor to add the auth token to every request.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;