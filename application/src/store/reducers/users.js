import {ADD_USER, USERS_LIST, USER_COORDINATES} from '../actions/ActionTypes';

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            const {type, ...otherProps} = action;
            return [...state, otherProps];
        case USERS_LIST:
            return action.users.map(user => user.id === window.socket.id ? {...user, self: true} : user);
        case USER_COORDINATES:
            return state.map(user => user.id === action.id ? {...user, coordinates: action.coordinates} : user);
        default:
            return state;
    }
};


export default users;
