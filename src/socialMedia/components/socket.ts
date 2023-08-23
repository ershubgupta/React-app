import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://social-chat-b236c4e72931.herokuapp.com/";

export const socket = io(URL, {
  autoConnect: false,
});