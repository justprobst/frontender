import { ADD_USER, USERS_LIST } from './ActionTypes';

let nextUserId = 0;

export const addUser = username => ({
    type: ADD_USER,
    id: nextUserId++,
    username
});

export const populateUsersList = users => ({
    type: USERS_LIST,
    users
});
