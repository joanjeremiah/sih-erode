const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const db = require("./db/db")
const header_middleware = require("./middlewares/header")
const cors = require("cors")
const socket = require("socket.io");

const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const questionRoutes = require("./Routes/questions");
const messageRoute = require("./Routes/messageRoute")

const app = express()

const PORT = process.env.PORT || 3001


app.use(express.json())
app.use(header_middleware)
app.use(cors())
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/messages",messageRoute);

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

// var http = require('http').createServer(app);
// http.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });

// const io = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// var STATIC_CHANNELS = [{
//   name: 'Global chat',
//   participants: 0,
//   id: 1,
//   sockets: []
// }, {
//   name: 'Funny',
//   participants: 0,
//   id: 2,
//   sockets: []
// }];

// app.get('/getChannels', (req, res) => {
//   res.json({
//       channels: STATIC_CHANNELS
//   })
// });

// io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
//   console.log('new client connected');
//   socket.emit('connection', null);
//   socket.on('channel-join', id => {
//       console.log('channel join', id);
//       STATIC_CHANNELS.forEach(c => {
//           if (c.id === id) {
//               if (c.sockets.indexOf(socket.id) == (-1)) {
//                   c.sockets.push(socket.id);
//                   c.participants++;
//                   io.emit('channel', c);
//               }
//           } else {
//               let index = c.sockets.indexOf(socket.id);
//               if (index != (-1)) {
//                   c.sockets.splice(index, 1);
//                   c.participants--;
//                   io.emit('channel', c);
//               }
//           }
//       });

//       return id;
//   });
//   socket.on('send-message', message => {
//       io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//       STATIC_CHANNELS.forEach(c => {
//           let index = c.sockets.indexOf(socket.id);
//           if (index != (-1)) {
//               c.sockets.splice(index, 1);
//               c.participants--;
//               io.emit('channel', c);
//           }
//       });
//   });

// });

const server =  app.listen(PORT,()=>{
  console.log(`Server connected successfully on Port  ${PORT}.`);
});

const io = socket(server,{
  cors:{
     origin:"http://localhost:3000",
      Credential:true,     
  }}
  );

  global.onlineUsers = new Map();
 io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
      onlineUsers.set(userId,socket.id);
  });
  socket.on("send-msg",(data)=>{
      const sendUserSocket = onlineUsers.get(data.to);
      if(sendUserSocket){
          socket.to(sendUserSocket).emit("msg-receive",data.message);
      }
     });
});