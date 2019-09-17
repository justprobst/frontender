import openSocket from "socket.io-client";
import { messageReceived } from "../store/actions/messages";
import { addUser, populateUsersList, updateUserCoordinates } from "../store/actions/users";

const setupSocket = (dispatch) => {
    const socket = openSocket('http://localhost:8989');
    socket.on('chat message', (message, username) => dispatch(messageReceived(message, username)));
    socket.on('add user', ({userId, username}) => dispatch(addUser(userId, username)));
    socket.on('users list', users => dispatch(populateUsersList(users)));
    socket.on('user coordinates', ({userId, coordinates}) => dispatch(updateUserCoordinates(userId, coordinates)));
    socket.emit('add user', 'nameless user');
    return socket;
};

export default setupSocket;
