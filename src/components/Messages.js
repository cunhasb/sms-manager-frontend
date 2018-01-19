import React from "react";
import NewMessageForm from "./NewMessageForm";

const MessagesArea = ({ messages: { id, name } }) => {
  return (
    <div className="messagesArea">
      <h2>{name}</h2>
      <ul>{orderedMessages(name)}</ul>
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>;
  });
};
