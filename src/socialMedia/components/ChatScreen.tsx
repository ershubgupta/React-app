import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import mock from "../mock.json";
// import SingleChatPreview from "../components/SingleChatPreview";
// import axios from "axios";
import axiosConfig from "../../config/axiosConfig";

import { find } from "lodash";
import { IMessage } from "../redux/Types";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Loader from "./Loader/Loader";

function ChatScreen(props: any) {
  const [userListWhichAreTyping, setUserListWhichAreTyping] = useState<
    string[]
  >([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  // const currentUser = props.currentUser;
  // console.log(props.currentUser);
  const { userName } = useParams();
  const ownerName = localStorage.getItem("displayName") ?? "";
  const socket = props.socket;

  const currentUser = props.users.find(
    (user: { name: string }) => user.name.toLowerCase() === userName
  )!;

  useEffect(() => {
    axiosConfig(`/messages/${ownerName}&${userName}`).then((response) => {
      setMessages(response.data);
    });
  }, [ownerName, userName]);

  useEffect(() => {
    socket.on("messageResponse", (data: IMessage) => {
      setMessages([
        ...messages,
        {
          name: data.name,
          messageText: data.messageText,
          timeStamp: data.timeStamp,
        },
      ]);
    });
  }, [messages, socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("isTypingResponse", (userList: string[]) => {
      // setUserListWhichAreTyping(userList);
      currentUser.isTyping = userList.includes(currentUser.name);
    });
  }, [currentUser, socket]);

  const deleteUserChats = () => {
    axiosConfig
      .delete(`/messages/${ownerName}&${userName}`)
      .then((response) => {
        if (response.data === "ok") setMessages([]);
      })
      .catch((error) => console.error(error.response));
  };

  return (
    <>
      <div
        className=" chatHeader flex items-center py-2 px-4 border-b-1 shadow-inner"
        style={{ backgroundColor: "#eeeeee" }}
      >
        <div className="flex-auto">
          <Avatar
            isBordered
            showFallback
            color={currentUser?.isActive ? "success" : "default"}
            src={currentUser?.displayPicture}
            className="w-14 h-14 inline-block"
          />
          <span className="text-md capitalize text-black inline-block ml-3 align-middle">
            {currentUser?.name}
            {currentUser?.isTyping && (
              <i
                className="text-sm block lowercase"
                style={{ color: "#15803d" }}
              >
                typing...
              </i>
            )}
          </span>
        </div>
        <div className="flex-auto text-right">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                size="lg"
                className="outline-none"
              >
                <BsThreeDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={deleteUserChats}
            >
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete Chats
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div
        className="chatBody p-3 text-sm overflow-auto relative"
        style={{
          height: "calc(100vh - 129px - 4rem)",
          backgroundColor: "#e2dbd5",
        }}
      >
        <ChatBody messages={messages} ownerName={ownerName} />
        {currentUser?.isTyping && (
          <div className="relative h-3 text-left">
            <Loader />
          </div>
          // <i className="text-green-500 text-sm block lowercase absolute bottom-2">typing...</i>
        )}
        <div ref={lastMessageRef} />
      </div>
      <div className="chatFoote" style={{ backgroundColor: "#e9e7e6" }}>
        <ChatFooter
          userName={userName}
          ownerName={ownerName}
          socket={props.socket}
        />
      </div>
    </>
  );
}

export default ChatScreen;
