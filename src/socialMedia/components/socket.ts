import { io } from "socket.io-client";
import Notification from "../utils/Notification";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://social-chat-backend.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});

// Log Error
socket.on("connect_error", (error) => {
  Notification(error.message, "Error", "danger");
});
