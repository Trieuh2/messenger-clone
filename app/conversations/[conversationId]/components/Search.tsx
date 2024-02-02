'use client';

import { FullMessageType } from '@/app/types';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';

interface SearchProps {
  searchBarOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  messages: FullMessageType[];
  setSearchTargetId: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({
  searchBarOpen,
  onClick,
  onClose,
  messages,
  setSearchTargetId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchQuery: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue('searchQuery', '', { shouldValidate: true });

    if (data.searchQuery) {
      const keywords = data.searchQuery.split(' ');
      const regexPattern = keywords.join('|');
      const regex = new RegExp(regexPattern, 'i');

      let filteredMessages = messages.filter(
        (message) => message.body && regex.test(message.body)
      );

      if (filteredMessages.length != 0) {
        setSearchTargetId(filteredMessages[0].id);
      }
    }
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, onClose]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex
        items-center 
        gap-2 
        lg:gap-4
        w-full
        max-h-32
      "
    >
      <div
        id="searchQuery"
        {...register('searchQuery')}
        className={`
          flex
          items-center
          w-full
          h-full
          px-3
        `}
      >
        <input
          id="searchQuery"
          autoComplete="searchQuery"
          {...register('searchQuery')}
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
            duration-[1200ms]
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
    </form>
  );
};

export default Search;
