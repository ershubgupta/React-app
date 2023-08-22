import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

function Notification(
  message: string,
  title = "",
  type: NOTIFICATION_TYPE = "success"
) {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      // onScreen: true,
    },
  });
}

export default Notification;