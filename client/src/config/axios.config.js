import axios from "axios";

const axiosInstance = new axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,  

})
export default axiosInstance; 