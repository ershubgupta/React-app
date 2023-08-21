export interface IUserStatus {
  id: string | number;
  name: string;
  isActive: Boolean;
  lastSeen: string;
  isTyping?: boolean;
  lastMessage?: string;
  displayPicture?: string;
}

export interface IUserAddOn extends IUserStatus {
  
}

export interface IMessage {
  // messageOwner: string;
  messageText: string;
  timeStamp: string;
  name: string;
  ownerMsgId?:string | undefined,
  participantMsgId?:string | undefined;
  // participantName: string;
}