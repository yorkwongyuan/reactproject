let express = require('express');
let app = express();
let http = require('http');

let users = [];

let server = http.createServer(app);
let io = require('socket.io').listen(server);

server.listen(process.env.NODE_ENV || 3333);

io.sockets.on('connection', function (socket) {
    socket.on('login', function (nickname) {
        // 如果已经登陆了
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted', nickname, users)
        } else {
            socket.nickname = nickname;
            users.push(nickname);
            // 发送loginSuccess事件
            socket.emit('loginSuccess', nickname, users);
            io.sockets.emit('system', nickname, users, 'login')
        }
    });
    // 用户退出
    socket.on('disconnect', function () {
        if (socket.nickname != null) {
            // 从用户表中删除
            users.splice(users.indexOf(socket.nickname), 1);
            // 广播全局：退出，不包括当前发送者
            socket.broadcast.emit('system', socket.nickname, users, 'logout');
        }
    })

    socket.on('postMsg', function (msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });

    socket.on('img', function (imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color)
    });
});