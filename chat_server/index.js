const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8989;

const users = [];

app.get('/', (req, res) => {
    res.send('chat server serves here');
});

io.on('connection', socket => {
    socket.on('add user', username => {
        console.log(username + ' connected');
        users.push({username});
        socket.broadcast.emit('add user', username);
        socket.emit('users list', users);

    });

    socket.on('chat message', (message, user) => {
        socket.broadcast.emit('chat message', message, user);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port);
