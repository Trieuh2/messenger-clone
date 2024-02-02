'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface BodyProps {
  messages: FullMessageType[];
  setMessages: Dispatch<SetStateAction<FullMessageType[]>>;
  setSearchTargetId: Dispatch<SetStateAction<string>>;
  searchTargetId: string;
}

const Body: React.FC<BodyProps> = ({
  messages,
  setMessages,
  setSearchTargetId,
  searchTargetId,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId, setMessages]);

  useEffect(() => {
    if (searchTargetId && messageRefs.current[searchTargetId]) {
      const targetMessage = messageRefs.current[searchTargetId];

      if (targetMessage) {
        targetMessage.scrollIntoView({
          behavior: 'smooth',
        });
      }
      setSearchTargetId('');
    }
  }, [searchTargetId, setSearchTargetId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <div
          ref={(el) => (messageRefs.current[message.id] = el)}
          key={message.id}
          className="p-0 m-0"
        >
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        </div>
      ))}
      <div ref={bottomRef} className="pt-4" />
    </div>
  );
};

export default Body;
