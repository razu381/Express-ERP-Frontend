import axios from "axios";

let axiosPublic = axios.create({
  baseURL: "https://employe-management-server.vercel.app",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
