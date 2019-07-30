import { ADD_MESSAGE, MESSAGE_RECEIVED } from './ActionTypes';

let nextMessageId = 0;

export const AddMessage = (message, author) => ({
    type: ADD_MESSAGE,
    id: nextMessageId++,
    message,
    author
});

export const messageReceived = (message, author) => ({
    type: MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    author
});
