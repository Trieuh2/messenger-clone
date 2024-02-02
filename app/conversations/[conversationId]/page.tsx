'use client';

import EmptyState from '@/app/components/EmptyState';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import { useEffect, useState } from 'react';
import { FullMessageType } from '@/app/types';
import { Conversation, User } from '@prisma/client';

interface IParams {
  conversationId: string;
}

const ConversationId = ({ params }: { params: IParams }) => {
  const [messages, setMessages] = useState<FullMessageType[]>([]);
  const [conversation, setConversation] = useState<
    (Conversation & { users: User[] }) | null
  >(null);
  const [searchTargetId, setSearchTargetId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversationResponse = await fetch(
          `/api/conversations/${params.conversationId}`
        );
        const fetchedConversation: Conversation & {
          users: User[];
        } = await conversationResponse.json();

        const messagesResponse = await fetch(
          `/api/messages/${params.conversationId}`
        );
        const fetchedMessages: FullMessageType[] =
          await messagesResponse.json();

        setConversation(fetchedConversation);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [params.conversationId]);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header
          conversation={conversation}
          messages={messages}
          setSearchTargetId={setSearchTargetId}
        />
        <Body
          messages={messages}
          setMessages={setMessages}
          setSearchTargetId={setSearchTargetId}
          searchTargetId={searchTargetId}
        />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
