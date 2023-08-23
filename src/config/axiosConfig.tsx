import axios from "axios";
// import path from "path";
// import { dot } from "dotenv";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://social-chat-b236c4e72931.herokuapp.com/";

const instance = axios.create({
  // url: "/messages",
  baseURL: url,
  method: "get",
});

export default instance;
