import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';
import notifcationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const sound = new Audio(notifcationSound);
      sound.play();

      setMessages([...messages, newMessage]);
    });

    return () => socket.off('newMessage');
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
