'use client';

import { IoSearch } from 'react-icons/io5';

interface SearchProps {
  searchBarOpen: boolean;
  onClick: () => void;
}

const Search: React.FC<SearchProps> = ({ searchBarOpen, onClick }) => {
  return (
    <div
      className={`
      flex
      items-center
      w-full
      h-full
      px-3
      `}
    >
      <input
        placeholder="Search"
        className={`
          pl-10
          text-gray-800
          bg-gray-100
          font-light
          py-2
          w-full
          rounded-2xl
          focus:outline-none
          overflow-hidden
          resize-none
          transition-opacity
          ease-in-out
          transform
          duration-1000
          ${searchBarOpen ? ' opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        maxLength={4096}
        style={{ visibility: searchBarOpen ? 'visible' : 'hidden' }}
      />

      <div
        className={`
          relative
          transition-all
          duration-500
          ease-in-out
          shrink-0
          pl-3
          ${
            searchBarOpen
              ? 'right-full translate-x-full'
              : 'right-8 translate-x-full'
          }`}
      >
        <IoSearch
          size={24}
          onClick={onClick}
          className={`
            text-sky-500
            cursor-pointer
            hover:text-sky-600
          `}
        />
      </div>
    </div>
  );

  
};

export default Search;
