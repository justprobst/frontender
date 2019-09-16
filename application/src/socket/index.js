import openSocket from "socket.io-client";
import { messageReceived } from "../store/actions/messages";
import { addUser, populateUsersList } from "../store/actions/users";

const setupSocket = (dispatch) => {
    const socket = openSocket('http://localhost:8989');
    socket.on('chat message', (message, username) => dispatch(messageReceived(message, username)));
    socket.on('add user', username => dispatch(addUser(username)));
    socket.on('users list', users => dispatch(populateUsersList(users)));
    socket.emit('add user', 'nameless user');
    return socket;
};

export default setupSocket;
