import { Axios } from "axios";

const axiosClient = new Axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,  

})