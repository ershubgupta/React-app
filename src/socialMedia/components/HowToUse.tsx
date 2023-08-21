import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function HowToUse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modalContent = [
    "To Initiate a chat, select any user from the user panel present on the left.",
    "Then use the bottom area of 'Write Message' field to enter and send messages",
    "To check the sent messages or to do two way communication, follow the below steps.",
    "Copy the name of person whom you sent the message or with whom you want to do the chatting.",
    "Now open the same URL in Ingonito Mode, and then enter the name at the start, which you have copied in above step.",
    "Now you should see the sender's name on the left panel, click and enjoy Chatting...",
  ];
  return (
    <>
      <Button onPress={onOpen} className="bg-transparent text-white underline text-md p-0 pb-4 italic block">How To Use...?</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                How To Use This Application
              </ModalHeader>
              <ModalBody>
                <ul>
                  {modalContent.map((item: string | JSX.Element, index: number) => (
                    <li key={index} className="mb-2 text-sm last-of-type:mb-0">{item}</li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Got It
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
