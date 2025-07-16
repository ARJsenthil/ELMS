import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true, // send cookies (refresh token)
});

// Response interceptor for token expiry
instance.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (err.response && err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await instance.post('/auth/refresh');
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (refreshErr) {
                if (refreshErr.response?.status === 403) {
                    axios.post("/auth/logout");
                    localStorage.removeItem('token');
                    localStorage.removeItem("loginSession");
                    window.location.href = '/login';
                }
                // window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default instance;