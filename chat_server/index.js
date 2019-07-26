const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8989;

app.get('/', (req, res) => {
    res.send('chat server serves here');
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('chat message', message => {
        console.log('message: ' + message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port);
