import users from './users';
import {ADD_USER, USERS_LIST, USER_COORDINATES} from '../actions/ActionTypes';

describe('users reducer', () => {
    it('ADD_USER', () => {
        const initialState = [{
            id: 0,
            username: 'Roman'
        }];

        const action = {
            type: ADD_USER,
            id: 1,
            username: 'Ivan'
        };

        expect(users(initialState, action)).toEqual([...initialState, {
            id: action.id,
            username: action.username
        }]);
    });

    it('USERS_LIST', () => {
        const initialState = [{
            id: 123
        }];

        const action = {
            type: USERS_LIST,
            users: [{id: 0, self: false}, {id: 1, self: false}]
        };

        Object.defineProperty(window, 'socket', {
            get: jest.fn(() => ({id: 1}))
        });

        expect(users(initialState, action)).toEqual([
            {id: 0, self: false},
            {id: 1, self: true}
        ]);
    });

    it('USER_COORDINATES', () => {
        const initialState = [{id: 0}, {id: 1}];

        const action = {
            type: USER_COORDINATES,
            id: 1,
            coordinates: {x: 1, y: 1}
        };

        expect(users(initialState, action)).toEqual([
            {id: 0},
            {id: 1, coordinates: action.coordinates}
        ]);
    });
});
