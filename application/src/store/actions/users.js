import { ADD_USER } from './ActionTypes';

let nextUserId = 0;

export const addUser = name => ({
    type: ADD_USER,
    id: nextUserId++,
    name
});
