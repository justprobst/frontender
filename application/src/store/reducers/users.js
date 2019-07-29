import { ADD_USER } from '../actions/ActionTypes';

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            return Object.assign({}, state, {
                name: action.name,
            });
        default:
            return state;
    }
};


export default users;
