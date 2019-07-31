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
    let userId = 0;

    socket.on('add user', username => {
        console.log(username + ' connected');
        user.username = username;
        while (users.length > userId && users.map(user => user.id).indexOf(userId) !== -1) {
            userId++;
        }
        user.id =  userId;
        users.push(user);
        socket.broadcast.emit('add user', username);
        socket.emit('users list', users);
    });

    socket.on('chat message', (message) => {
        socket.broadcast.emit('chat message', message, user.username);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port);
