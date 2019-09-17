const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8989;

const users = [];

app.get('/', (req, res) => {
    res.send('chat server serves here');
});

io.on('connection', socket => {
    const user = {};

    socket.on('add user', username => {
        console.log(username + ' connected');
        user.username = username;
        user.id = socket.id;
        users.push(user);
        socket.broadcast.emit('add user', {userId: socket.id, username});
        socket.emit('users list', users.map(user => user.id === socket.id ? {...user, self: true} : user));
    });

    socket.on('username', username => {
        const userIndex = users.map(user => user.id).indexOf(socket.id);
        users[userIndex].username = username;
        io.sockets.emit('users list', users);
    });

    socket.on('user move', coordinates => {
        const userIndex = users.map(user => user.id).indexOf(socket.id);
        users[userIndex].coordinates = coordinates;
        socket.broadcast.emit('user coordinates', {userId: socket.id, coordinates});
    });

    socket.on('chat message', message => {
        socket.broadcast.emit('chat message', message, user.username);
    });

    socket.on('disconnect', () => {
        console.log(user.username + ' disconnected');
        const userIndex = users.map(user => user.id).indexOf(socket.id);
        users[userIndex] = users[users.length - 1];
        users.pop();
        socket.broadcast.emit('users list', users);
    });
});

http.listen(port);
