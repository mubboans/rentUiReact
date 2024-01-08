import axios from "axios";
// import baseUrl from
export const axiosConfig = axios.create({
    baseURL: "http://localhost:8001/apna-rent/v1/",
    withCredentials: true,
})
axiosConfig.defaults.headers.common['Content-Type'] = 'application/json'
// export const request = ({...options}) => {
//     axiosConfig.defaults.headers.

// }