import { ADD_MESSAGE, MESSAGE_RECEIVED } from './ActionTypes';
import { addMessage, messageReceived } from './messages';

const addMessageResult = addMessage('Hello', 'Roman');
const messageReceivedResult = messageReceived('Hi', 'Ivan');

describe('messages actions', () => {
    it('addMessage', () => {
        expect(addMessageResult).toEqual({
            type: ADD_MESSAGE,
            id: 0,
            message: 'Hello',
            author: 'Roman'
        });
    });

    it('messageReceived', () => {
        expect(messageReceivedResult).toEqual({
            type: MESSAGE_RECEIVED,
            id: addMessageResult.id + 1,
            message: 'Hi',
            author: 'Ivan'
        });
    });
});
