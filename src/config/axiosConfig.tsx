import axios from "axios";
const instance = axios.create({
  // url: "/messages",
  baseURL: "http://localhost:4000/",
  method: "get"
});


export default instance;
