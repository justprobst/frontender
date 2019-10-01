import messages from './messages';
import { ADD_MESSAGE, MESSAGE_RECEIVED } from '../actions/ActionTypes';

const initialState = [{
    id: 0,
    message: 'Hi',
    author: 'Roman'
}];

function Action(type) {
    this.type = type;
    this.id = 1;
    this.message = 'Hello';
    this.author = 'Ivan';
}

describe('messages reducer', () => {
    it('ADD_MESSAGE', () => {
        const action = new Action(ADD_MESSAGE);
        expect(messages(initialState, action)).toEqual([...initialState, {
            id: action.id,
            message: action.message,
            author: action.author
        }]);
    });

    it('MESSAGE_RECEIVED', () => {
        const action = new Action(MESSAGE_RECEIVED);
        expect(messages(initialState, action)).toEqual([...initialState, {
            id: action.id,
            message: action.message,
            author: action.author
        }]);
    });
});
