import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <div className='flex flex-col w-full h-full rounded-lg border border-zinc-800'>
        <Navbar />
        <div className='flex flex-1 h-full w-full overflow-auto'>
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
