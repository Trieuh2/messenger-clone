interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  return <div>Conversation ID!</div>;
};

export default ConversationId;
