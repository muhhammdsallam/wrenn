import { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();

  // for useEffect
  // [] -> runs once after the component mounts
  // [count] -> runs when count changes

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]); // only runs when the values in the array changes
  return (
    <div className='px-4 flex-1 overflow-auto '>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message key={message._id} message={message} />
          </div>
        ))}
      {loading && [...Array(8)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
