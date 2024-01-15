import axios from "axios";
import { getValue } from "./localhelper";
// import baseUrl from
const axiosConfig = axios.create({
    baseURL: "http://localhost:8001/apna-rent/v1/",
    withCredentials: true,
})
axiosConfig.interceptors.request.use(
    (config) => {

        const token = getValue('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.params) {
            config.url += `?${new URLSearchParams(config.params).toString()}`;
            config.params = {}; // Reset params to avoid duplicate params
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosConfig.defaults.headers.common['Content-Type'] = 'application/json'
// export const request = ({...options}) => {
//     axiosConfig.defaults.headers.

// }
export default axiosConfig;