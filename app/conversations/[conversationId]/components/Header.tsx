'use client';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import useActiveList from '@/app/hooks/useActiveList';
import Search from './Search';
import clsx from 'clsx';
import { FullMessageType } from '@/app/types';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  messages: FullMessageType[];
  setSearchTargetId: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  conversation,
  messages,
  setSearchTargetId,
}) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  const toggleSearch = useCallback(() => {
    setSearchBarOpen(searchBarOpen === false ? true : false);
  }, [searchBarOpen]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
          bg-white
          w-full
          flex
          border-b-[1px]
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm
          gap-3
        "
      >
        <div className="flex flex-shrink-0 gap-3 items-center">
          <Link
            href="/conversations"
            className="
              lg:hidden
              block
              text-sky-500
              hover:text-600
              transition
              cursor-pointer
            "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
                text-sm
                font-light
                text-neutral-500
              "
            >
              {statusText}
            </div>
          </div>
        </div>
        <div
          className={clsx(
            `
            flex
            w-full
            gap-3
            justify-end
            items-center
            `
          )}
        >
          <Search
            searchBarOpen={searchBarOpen}
            onClick={() => toggleSearch()}
            onClose={() => setSearchBarOpen(false)}
            messages={messages}
            setSearchTargetId={setSearchTargetId}
          />
          <HiEllipsisHorizontal
            size={32}
            onClick={() => {
              setDrawerOpen(true);
            }}
            className="
              text-sky-500
              cursor-pointer
              hover:text-sky-600
              transition
            "
          />
        </div>
      </div>
    </>
  );
};

export default Header;
