import React, { useState, useEffect } from "react";
import Chats from "./Chats";
import { socket } from "../components/socket";
import { Store } from "react-notifications-component";
import Notification from "../utils/Notification";

function SocialMedia(param: any) {
  const [userName, setUserName] = useState(
    localStorage.getItem("displayName") ?? ""
  );
  // console.log("social media screen");
  

  // const [activeUserList, setActiveUserList] = useState<Set<string>>(new Set());

  // const removeUser = () => setUserName("");

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target.displayName.value);
    const userName: string = e.target.displayName.value.toLowerCase();
    localStorage.setItem("displayName", userName);
    setUserName(userName);
    // socket.connect();
    socket.emit("login", userName);
    Notification("You are now logged in", "Congratulations", "info");
  };

  //  useEffect(() => {
  //    socket.on("activeUserList", (data: any) => {
  //      console.log("Received activeUserList from server: ", data);
  //      setActiveUserList((data) => new Set(data));
  //    });

  //    return () => {
  //      socket.off("activeUserList");
  //    };
  //  }, []);
  // console.log("activeUserList", activeUserList);

  const onUserRemove = () => {
    console.log("Remove userNamee");
    socket.emit("logout", userName);
    setUserName("");
    localStorage.setItem("displayName", "");
    Notification("You are now logged out", "See You Soon", "info");

    // socket.close();
  };

  useEffect(() => {
    if (userName) {
      socket.connect();
    }
  }, [userName]);

  return (
    <>
      {userName.length > 0 ? (
        <Chats
          userName={userName}
          onUserRemove={onUserRemove}
          socket={socket}
        />
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <form onSubmit={(e) => onFormSubmit(e)} className="shadow-xl border border-gray-200 py-5 px-10">
            <div className="text-center">
              <label htmlFor="displayName" className="block text-lg font-semibold mb-5">
                Set your Profile Name:
              </label>
              <input
                placeholder="Enter Here..."
                className="placeholder-slate-100 border bg-orange-300 w-80 rounded-md text-medium text-white p-2"
                type="text"
                name="displayName"
                autoComplete="false"
              />
              <button className="block mt-3 w-40 bg-purple-800 rounded-md text-white px-3 py-1 m-auto">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// bg-gray-200
export default SocialMedia;
