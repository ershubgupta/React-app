import { useEffect, useState } from "react";
// import axios from "axios";
import { find } from "lodash";
import axiosConfig from "../../config/axiosConfig";


function useChats(userName:string) {
  // const { userName } = props;
  const [chatsHistory, setChatsHistory] = useState("");

  useEffect(() => {
    axiosConfig("/messages").then((response) => {
      console.log("calling api");
      let msgData = response["data"];
      // console.log(msgData, userName);
      setChatsHistory(find(msgData, (item) => item.ownerName === userName));
      // console.log(find(msgData, (item) => item.ownerName === userName));

      // if (userMessages) {
      //   const fetchParticipantMsgs = find(
      //     userMessages.participants,
      //     (item) => item.participantName === userName?.toLowerCase()
      //   );
      //   setMessages(fetchParticipantMsgs?.messages ?? []);
      //   setParticipantMsgId(fetchParticipantMsgs?._id);
      //   setOwnerMsgId(userMessages?._id);
      // }
    });
  }, [userName]);
  return chatsHistory;
}

export default useChats;
