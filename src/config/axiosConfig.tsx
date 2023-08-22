import axios from "axios";
// import path from "path";
// import { dot } from "dotenv";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://react-showcase-2.vercel.app/";

const instance = axios.create({
  // url: "/messages",
  baseURL: url,
  method: "get",
});

export default instance;
