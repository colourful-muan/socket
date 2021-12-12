const WebSocket = require('ws');
// 创建WebSocket服务端的对象, 绑定的端口号是3001
const wss = new WebSocket.Server({
    port: 3002,
});
// 服务端开启了监听
module.exports.listen = () => {
    // 对客户端的连接事件进行监听
    // client:代表的是客户端的连接socket对象
    wss.on('connection', client => {
        console.log('有客户端连接成功了...');
    // 对客户端的连接对象进行message事件的监听
    // msg: 由客户端发给服务端的数据
    client.on('message', async msg => {
        console.log('客户端发送数据给服务端了: ' + msg);
        // client.send('hello socket from backend')
        wss.clients.forEach(client => {
            client.send(msg);
    });
    });
});
};