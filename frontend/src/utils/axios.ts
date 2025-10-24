import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'auth_token_placeholder',
  },
});

// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers = config.headers ?? {};
//     (config.headers as any).authorization = `Bearer ${token}`;
//   }
//   return config;
// });
