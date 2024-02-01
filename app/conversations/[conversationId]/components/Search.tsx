'use client';

import { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchProps {
  searchBarOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ searchBarOpen, onClick, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (searchBarOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchBarOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, onClose]);

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
        ref={inputRef}
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
          duration-[1100ms]
          ${searchBarOpen ? ' opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        maxLength={4096}
        style={{ visibility: searchBarOpen ? 'visible' : 'hidden' }}
        value={content}
        onChange={handleInput}
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
