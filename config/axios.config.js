import axios from "axios";

//console.log(process.env);

// NODE APP PORT
const port = 8080;

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:" + port,
    headers: { "Access-Control-Allow-Origin": "*" },
});
