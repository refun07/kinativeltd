import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = window.auth_token; // Access token from memory (global var for simplicity in interceptor)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call refresh endpoint with token in body
                const response = await axios.post('http://localhost:8000/api/auth/refresh', {
                    refresh_token: refreshToken
                });

                const { access_token, refresh_token: newRefreshToken } = response.data;

                // Update tokens
                window.auth_token = access_token;
                localStorage.setItem('refresh_token', newRefreshToken);

                // Update header for this request
                api.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                originalRequest.headers.Authorization = 'Bearer ' + access_token;

                processQueue(null, access_token);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                window.auth_token = null; // Clear token on failure
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// Add type definition for window
declare global {
    interface Window {
        auth_token: string | null;
    }
}

export default api;
