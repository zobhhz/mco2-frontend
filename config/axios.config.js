import axios from "axios";

// NODE APP PORT
const port = 8080;
const url = process.env.BASE_URL;

export const axiosInstance = axios.create({
    baseURL: "http://" + url + ":" + port,
    headers: { "Access-Control-Allow-Origin": "*" },
});
