import { ADD_MESSAGE, MESSAGE_RECEIVED } from '../actions/ActionTypes';

const messages = (state = [], action) => {
    const {type, ...otherProps} = action;
    switch (type) {
        case ADD_MESSAGE:
        case MESSAGE_RECEIVED:
            return [...state, otherProps];
        default:
            return state;
    }
};


export default messages;
