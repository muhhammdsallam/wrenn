import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import ConversationUserInfo from './ConversationUserInfo';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const [clickReceiverInfo, setClickReceiverInfo] = useState(false);

  console.log(clickReceiverInfo);

  useEffect(() => {
    // Reset clickReceiverInfo when a new conversation is selected
    if (selectedConversation) {
      setClickReceiverInfo(false);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // cleanup function (unmounts)
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  return (
    <div className='w-screen flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : clickReceiverInfo ? (
        <ConversationUserInfo setClickReceiverInfo={setClickReceiverInfo} />
      ) : (
        <>
          {/* Header */}
          <div
            className='bg-transparent mt-2 px-4 py-2 mb-2 cursor-pointer'
            onClick={() => {
              setClickReceiverInfo(true);
            }}
          >
            <span className='label-text text-gray-200 font-medium'>
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
