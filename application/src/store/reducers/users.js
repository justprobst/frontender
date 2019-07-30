import { ADD_USER } from '../actions/ActionTypes';

const users = (state = [], action) => {
    const {type, ...otherProps} = action;
    switch (type) {
        case ADD_USER:
            return [...state, otherProps];
        default:
            return state;
    }
};


export default users;
