import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
