import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleColor = fromMe ? 'bg-blue-500' : '';

  const formattedTime = new Date(message.createdAt).toLocaleTimeString(
    'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Set to true for AM/PM format
    }
  );

  return (
    <div className={chatClassName}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full '>
          <img src={profilePic} alt='user avatar' />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor}`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1'>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
