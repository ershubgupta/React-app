import React, { useState, useEffect } from "react";
import SingleChatPreview from "../components/SingleChatPreview";
import { IUserStatus } from "../redux/Types";
import mock from "../mock.json";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import ChatScreen from "../components/ChatScreen";
import NoChatScreen from "../components/NoChatScreen";
// import Error from "../components/Error";
// import { io } from "socket.io-client";
import { keyBy, map, merge, values } from "lodash";
import { ImBin } from "react-icons/im";
// import axios from "axios";
import axiosConfig from "../../config/axiosConfig";
import HowToUse from "../components/HowToUse";
// import { socket } from "../components/socket";

function Chats(props: any) {
  const socket = props.socket;
  // const [chattingWith, setChattingWith] = useState("");
  const [onlineUser, setOnlineUsers] = useState<IUserStatus[]>([]);
  const [offlineUser, setOfflineUsers] = useState<IUserStatus[]>(mock);

  useEffect(() => {
    axiosConfig("/users").then((response) => {
      const res = response["data"];
      console.log(res);
      const list = map(res, (user) => ({
        id: user._id,
        name: user.name,
        isActive: true,
        lastSeen: user.timeStamp,
        displayPicture: `https://i.pravatar.cc/15${
          10 + Math.floor(Math.random() * 10)
        }`,
      }));
      // console.log("list", list);
      setOnlineUsers(list);
    });
  }, []);

  useEffect(() => {
    socket.on("newUser", (name: string) => {
      console.log("new user", name);
      setOnlineUsers((prev) => [
        ...prev,
        {
          id: (10 + Math.floor(Math.random() * 10)).toString(),
          name: name,
          isActive: true,
          lastSeen: new Date().toString(),
          displayPicture: `https://i.pravatar.cc/15${
            10 + Math.floor(Math.random() * 10)
          }`,
        },
      ]);
    });

    return () => {
      socket.off("newUser");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("removeUser", (name: string) => {
      setOnlineUsers((prev) => prev.filter((user) => user.name !== name));
      console.log("Removed User: ", name);
    });

    return () => {
      socket.off("removeUser");
    };
  }, [socket]);

  console.log(
    "merered array",
    values(merge(keyBy(onlineUser, "name"), keyBy(offlineUser, "name")))
  );

  const userList = values(
    merge(keyBy(onlineUser, "name"), keyBy(offlineUser, "name"))
  );

  // const [userList, setUserList] = useState(
  //   merge(keyBy(onlineUser, "name"), keyBy(offlineUser, "name"))
  // );

  // useEffect(() => {
  //   socket.on("isTypingResponse", (typingUserList: string[]) => {

  //     setUserList(userList);
  //   }
  //   );
  // }, [socket]);

  return (
    <div className="h-screen w-screen ">
      <div className="relative p-8 overflow-hidden h-full w-full">
        <div className="w-screen h-16 bg-green-700 fixed top-0 left-0 z-0"></div>
        <div className="absolute top-1 left-8">
          <HowToUse />
        </div>
        <div className="flex items-center absolute top-0 right-8 z-20 text-white">
          {/* <div></div> */}
          <span className="text-md capitalize ml-1 mr-2 align-middle">
            Hello {props.userName}
          </span>
          <ImBin onClick={props.onUserRemove} className="cursor-pointer" />
        </div>
        <div className="flex h-full z-10 relative shadow-xl bg-white">
          <div
            className="flex-auto w-2/6 overflow-auto relative"

            // style={{ maxHeight: "calc(100vh - 58px)" }}
          >
            {userList.map((user) => (
              <Link
                to={`/social/chat/${user.name.toLowerCase()}`}
                key={user.name.toLowerCase()}
                // onClick={() => setChattingWith(user.name.toLowerCase())}
                // className="bg-white block"
              >
                <SingleChatPreview
                  {...user}
                  isActive={
                    !!onlineUser.find((item) => item.name === user.name)
                  }
                />
              </Link>
            ))}
          </div>
          <div className="flex-auto w-4/6">
            <Routes>
              <Route
                path="chat/:userName"
                element={<ChatScreen socket={socket} users={userList} />}
              />
              <Route path="*" element={<NoChatScreen />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

// bg-gray-200
export default Chats;
