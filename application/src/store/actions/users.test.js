import { ADD_USER, USERS_LIST, USER_COORDINATES } from './ActionTypes';
import { addUser, populateUsersList, updateUserCoordinates } from './users';

describe('users actions', () => {
    it('addUser', () => {
        expect(addUser(11, 'Roman')).toEqual({
            type: ADD_USER,
            id: 11,
            username: 'Roman'
        });
    });

    it('populateUsersList', () => {
        expect(populateUsersList([{id: 0}, {id: 1}])).toEqual({
            type: USERS_LIST,
            users: [{id: 0}, {id: 1}]
        });
    });

    it('updateUserCoordinates', () => {
        expect(updateUserCoordinates(11, {x: 22, y: 63})).toEqual({
            type: USER_COORDINATES,
            id: 11,
            coordinates: {x: 22, y: 63}
        });
    });
});
