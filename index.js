const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(express.static('./dist'))


app.get("/hello", (req, res) => {
    res.send("Hello");
});

const active = [];

io.on('connection', socket => {
    socket.on('connection', msg => {
        if (active.includes(msg)) {
            socket.emit('connection', 'This display name is already taken.');
        }
        else {
            active.push(msg);
            socket.emit('connection', 'Successfully logged on!');
        }
    });
    socket.on('disconnected', function () {
        io.emit('chat');
    });
    socket.on('chat', msg => {
        console.log('Receiving message from ws client: ', msg);
        io.emit('chat', msg);
    });
});
http.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});