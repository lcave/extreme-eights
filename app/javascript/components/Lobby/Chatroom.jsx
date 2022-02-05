import React from "react";
import ActionableInput from "../Forms/ActionableInput";
import styled from "styled-components";
import { getCurrentPlayer } from "../Authentication/currentPlayer";

const Chat = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.lightBasalt};
  border-radius: 15px;
  overflow: hidden;
`;

const Messages = styled.ul`
  flex-grow: 2;
  padding: 1rem;
`;

const Message = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.currentPlayer ? "end" : "start")};
`;

const MessageBody = styled.span`
  background-color: ${(props) =>
    props.currentPlayer
      ? props.theme.colors.emeraldGreen
      : props.theme.colors.lightBlue};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  width: fit-content;
  color: white;
`;

const MessageAuthor = styled.span`
  color: ${(props) => props.theme.colors.basalt};
  padding-left: 10px;
`;

export default function Chatroom({ messages, sendMessageCallback }) {
  const player = getCurrentPlayer();
  const messageAuthor = (message, previousMessage) => {
    if (message.player_id !== previousMessage?.player_id) {
      return (
        <MessageAuthor className="message-author">
          {message.author}
        </MessageAuthor>
      );
    }
  };

  return (
    <Chat>
      <Messages>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            currentPlayer={message.player_id === player.id}
          >
            {messageAuthor(message, messages[index - 1])}
            <MessageBody currentPlayer={message.player_id === player.id}>
              {message.body}
            </MessageBody>
          </Message>
        ))}
      </Messages>
      <ActionableInput
        inputLabel="Message"
        buttonLabel="Send"
        onClickCallback={(message) => sendMessageCallback(message)}
      />
    </Chat>
  );
}
