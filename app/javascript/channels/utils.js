import { createConsumer } from "@rails/actioncable";
import { currentPlayerToken } from "../components/Authentication/currentPlayer";

let consumer;

export const createCable = () => {
  if (!consumer) {
    consumer = createConsumer();
  }

  return consumer;
};

export const createChannel = (...args) => {
  const consumer = createCable();
  args[0].token = currentPlayerToken();
  return consumer.subscriptions.create(...args);
};
