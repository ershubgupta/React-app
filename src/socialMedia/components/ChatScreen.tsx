import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../config/axiosConfig";
import { IMessage } from "../redux/Types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar } from "@nextui-org/react";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Loader from "./Loader/Loader";
import Notification from "../utils/Notification";

function ChatScreen(props: any) {
  const [apiError, setApiError] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const { userName } = useParams();
  const ownerName = localStorage.getItem("displayName") ?? "";
  const socket = props.socket;
  const [currParticipant, setCurrParticipant] = useState(props.users.find(
    (user: { name: string }) => user.name.toLowerCase() === userName
  ));

  useEffect(() => {
    axiosConfig(`/messages/${ownerName}&${userName}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error.response);
        setApiError(error.response.message);
        Notification("Unable to fetch from API", "Error", "danger");
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

  // const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // console.log(currParticipant);
    socket.on("isTypingResponse", (userList: string[]) => {
      setCurrParticipant({
        ...currParticipant,
        isTyping: userList.includes(currParticipant?.name),
      });
      // currParticipant.isTyping = userList.includes(currParticipant?.name);
      // setIsTyping(userList.includes(currParticipant?.name));
      // console.log(userList, "is typing", currParticipant.isTyping);
    });
  }, [currParticipant, socket]);

  const deleteUserChats = () => {
    axiosConfig
      .delete(`/messages/${ownerName}&${userName}`)
      .then((response) => {
        if (response.data === "ok") {
          setMessages([]);
          Notification("Messages deleted Successfully", "");
        }
      })
      .catch((error) => {
        console.error(error.response);
        setApiError(error.response.message);
        Notification("Unable to fetch from API", "Error", "danger");
      });
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
            color={currParticipant?.isActive ? "success" : "default"}
            src={currParticipant?.displayPicture}
            className="w-14 h-14 inline-block"
          />
          <span className="text-md capitalize text-black inline-block ml-3 align-middle">
            {currParticipant?.name}
            {!!props.onlineUser.find(
              (item: { name: any }) => item.name === currParticipant?.name
            ) ? (
              currParticipant.isTyping ? (
                <Loader />
              ) : (
                <i
                  className="text-sm block lowercase"
                  style={{ color: "#15803d" }}
                >
                  Online
                </i>
              )
            ) : (
              ""
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

        <div ref={lastMessageRef} />
      </div>
      <div
        className="chatFooter relative"
        style={{ backgroundColor: "#e9e7e6" }}
      >
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
