import { user } from "./user"
import axios from "axios"

let reqInstance = axios.create({
    baseURL: "http://localhost:3002/",
    headers: {}
    });

    // Add a response interceptor
    reqInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const requestBody = {
            "grant_type": "refresh_token",
            "refresh_token": user.data.refresh_token
        };
          const response = await axios.post('http://localhost:3002/refreshtoken', requestBody);
          const { access_token } = response.data;
  
          localStorage.setItem('token', access_token);
  
          setAccessToken(access_token);
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
        }
      }
  
      return Promise.reject(error);
    }
  );
  

    export const setAccessToken = (accessToken: any) => {
        reqInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

  export default reqInstance;