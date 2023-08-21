import React, { useState } from "react";

function ChatFooter(props: {
  userName: string | undefined;
  ownerName: string;
  socket: any
}) {
  const { userName, ownerName } = props;
  const [message, setMessage] = useState("");

  const socket = props.socket;

  const handleTyping = (e: any) => {
    // console.log(e.target.value)
    if (e.target.value.length > 0) {
      socket.emit("isTyping", userName);
      console.log("use is typing");
      
    } else {
      socket.emit("isIdel", userName);
      console.log("use is not typing");
      // socket.emit("notTyping", `${userName} stopped typing`);
    }
  };

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        messageText: message,
        participantName: userName?.toLowerCase(),
        ownerName: ownerName.toLowerCase(),
        timeStamp: new Date(),
        // id: `${socket.id}${Math.random()}`,
        // socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <form
      className="form flex justify-between items-center p-3"
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        placeholder="Write message"
        className="rounded-sm p-1.5 w-full h-8 text-md outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => handleTyping(e)}
      />
      <button className="sendBtn bg-success-500 text-white p-1.5 text-sm rounded-sm">
        SEND
      </button>
    </form>
  );
}

export default ChatFooter;
