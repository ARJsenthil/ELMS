import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://elms-1-ultz.onrender.com/api/v1',
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
                console.log("23");
                if (refreshErr.response?.status === 403) {
                    axios.post("/auth/logout");
                    localStorage.removeItem('token');
                    localStorage.removeItem("loginSession");
                    window.location.href = '/login';
                }
                else if (refreshErr.response?.status === 503) {
                    console.log(refreshErr.response?.data.message);
                    alert("DB :(")
                }
                // window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }
        else if (err.response && err.response.status === 503) {
            alert(`⚠️ Oops! My Database Took a Coffee Break ☕
Looks like my DB host said, “No money, no data!” and went on vacation because the hosting plan expired.
If you're a recruiter checking out my site — don’t worry, the code still works… the database is just sleeping until I can afford to wake it up.
Hire me, and I promise the first thing I’ll do (after thanking you) is revive the database from its nap! 😅
Appreciate your understanding — and your job offer 👀💼`);
        }

        return Promise.reject(err);
    }
);

export default instance;