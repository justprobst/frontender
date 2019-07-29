import { ADD_MESSAGE, MESSAGE_RECEIVED } from './ActionTypes';

export const AddMessage = (message, author) => ({
    type: ADD_MESSAGE,
    message,
    author
});

export const messageReceived = (message, author) => ({
    type: MESSAGE_RECEIVED,
    message,
    author
});
