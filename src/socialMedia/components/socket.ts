import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://social-chat-backend.vercel.app/";

export const socket = io(URL, {
  autoConnect: false,
});