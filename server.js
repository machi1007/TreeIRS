const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 當有使用者連線時的處理
io.on('connection', (socket) => {
  console.log('一個使用者連線');

    // 接收來自客戶端的訊息事件
    socket.on('message', (message) => {
        // 在這裡處理接收到的訊息
        console.log('接收到訊息:', message);
        
        // 將接收到的訊息廣播給所有連線的客戶端
        io.emit('message', message);
    });

    // 斷開連線處理
    socket.on('disconnect', () => {
        console.log('使用者斷線');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`伺服器正在監聽 ${PORT} 連接埠`);
});