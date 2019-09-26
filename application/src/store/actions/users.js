import { ADD_USER, USERS_LIST, USER_COORDINATES } from './ActionTypes';

export const addUser = (id, username) => ({
    type: ADD_USER,
    id,
    username
});

export const populateUsersList = users => ({
    type: USERS_LIST,
    users
});

export const updateUserCoordinates = (id, coordinates) => ({
    type: USER_COORDINATES,
    id,
    coordinates
});
