import { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';

const Messages = () => {
  const { selectedConversation } = useConversation();
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 5);
  }, [messages]);

  const filteredMessages = messages.filter(
    (message) => message.senderId === selectedConversation?._id
  );

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && filteredMessages.length > 0
        ? messages.map((message) => (
            <div key={message.id} ref={lastMessageRef}>
              <Message key={message._id} message={message} />
            </div>
          ))
        : !loading && (
            <p className='text-center mt-4 text-sm'>
              Send a message to start the conversation
            </p>
          )}
      {loading && [...Array(8)].map((_, idx) => <MessageSkeleton key={idx} />)}
    </div>
  );
};

export default Messages;
