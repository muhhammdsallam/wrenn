import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error('No such user found');
    }
  };

  return (
    <div className='flex items-center'>
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered rounded-2xl h-9 text-sm'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type='submit'
          className='btn btn-circle bg-green-600 text-white hover:bg-green-700'
        >
          <CiSearch className='h-4 w-4' />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
