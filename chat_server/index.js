const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8989;

app.get('/', (req, res) => {
    res.send('chat server serves here');
});

io.on('connection', socket => {
    socket.on('add user', username => {
        console.log(username + ' connected');
        socket.broadcast.emit('add user', username);
    });

    socket.on('chat message', (message, user) => {
        socket.broadcast.emit('chat message', message, user);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port);
