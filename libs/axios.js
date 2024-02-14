import axios from 'axios'
export let baseUrl = axios.create({
  baseURL: "https://auth-mern-rldb.onrender.com/api",
  withCredentials: true,
});
