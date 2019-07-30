import { ADD_USER, USERS_LIST  } from '../actions/ActionTypes';

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            const {type, ...otherProps} = action;
            return [...state, otherProps];
        case USERS_LIST:
            return action.users;
        default:
            return state;
    }
};


export default users;
