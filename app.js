const Koa = require("koa");
const app = new Koa();

const config = require("./config"); // 引入接口配置文件
const http = require("http");

const server = http.Server(app.callback());
const io = require("socket.io")(server);

const store = require("./module/store.js"); // 引入数据处理逻辑

let userInfoList=[] // 用户列数据

// 服务端发送消息
function sendMessageFromServe(data) { // 广播数据
  io.sockets.emit("downMessageQueue", data);
}

// 服务端接受消息
io.on("connection", (socket) => {
  socket.on("fromUpMessageQueue", (res) => {
    const data=store.dataStorage(res)
    console.log(store.dataStorage(res),'处理接收的消息')
    sendMessageFromServe(data);
  });
});
// 监听对应端口
server.listen(config.port, "0.0.0.0", (err) => {
  if (err) {
    console.log("server error: ", err);
  } else {
    console.log("server at" + config.port);
  }
});


//----------------------------分割线-------------------------------//
// const config = require("./config");
// // 处理HTTPS
// const https = require("https");
// const sslify = require("koa-sslify").default; // koa-sslify是实施HTTPS中间件, 可对任何传入请求强制实施HTTPS连接
// const fs = require("fs");
// const options = {
//   key: fs.readFileSync("ssl/chengqi.fun.key"),
//   cert: fs.readFileSync("ssl/chengqi.fun.pem"),
// };
// const server = https.Server(options, app.callback());

// // 服务端处理socket
// const io = require("socket.io")(server);
// // 服务端建立连接
// io.on("connect", (socket) => {
//   console.log("server_linked_up");
// });

// // 服务端发送消息
// io.on("connection", (socket) => {
//     socket.emit("downMessageQueue", "你好！这是服务端发送的数据");
//   });

// // 服务端接受消息
// io.on("connection", (socket) => {
//   socket.on("fromUpMessageQueue", (res) => {
//     console.log(res);
//   });
// });

// // 监听对应端口
// server.listen(config.port, "0.0.0.0", (err) => {
//   if (err) {
//     console.log("server error: ", err);
//   } else {
//     console.log("server at" + config.port);
//   }
// });

// app.use(sslify);


// const webSocketService = require('./module/webSocket')
// // 开启服务端的监听, 监听客户端的连接
// // 当某一个客户端连接成功之后, 就会对这个客户端进行message事件的监听
// webSocketService.listen()
