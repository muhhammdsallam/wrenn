import { useEffect } from 'react';
import useConversation from '../../zustand/useConversation';
import { IoArrowBack } from 'react-icons/io5';

const ConversationUserInfo = ({ setClickReceiverInfo }) => {
  const { selectedConversation } = useConversation();
  return (
    <div className='w-full h-full flex flex-col items-center justify-center relative'>
      <button
        className='absolute top-4 left-4 text-gray-200 hover:text-gray-400'
        onClick={() => setClickReceiverInfo(false)}
      >
        <IoArrowBack size={20} />
      </button>

      <div className='avatar -mt-64'>
        <div className='w-32 rounded'>
          <img src={selectedConversation.profilePic} />
        </div>
      </div>

      <p className='text-gray-200 mt-6 text-2xl font-medium'>
        {selectedConversation.fullName}
      </p>
      <p className='text-gray-500 mt-0 text-lg font-normal'>
        @{selectedConversation.username}
      </p>
    </div>
  );
};

export default ConversationUserInfo;
