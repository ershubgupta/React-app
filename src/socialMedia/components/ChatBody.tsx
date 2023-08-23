import React from 'react'
import { IMessage } from '../redux/Types';

function ChatBody(props: {
  messages: IMessage[];
  ownerName: string;
}) {
  const { messages, ownerName } = props;
  return (
    <ul>
      {messages.map((msg) =>
        msg.name === ownerName ? (
          <li
            key={msg.timeStamp}
            className="bg-white p-2 m-2 max-w-max block rounded-md ml-auto"
          >
            {msg.messageText}
          </li>
        ) : (
          <li
            key={msg.timeStamp}
            className="bg-green-400 p-2 m-2 max-w-max block rounded-md"
          >
            {msg.messageText}
          </li>
        )
      )}
    </ul>
  );
}

export default ChatBody