const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const model = require('./model');
const Chat = model.getModel('chat');
const app = express();

// Chat.remove({}, function(err, doc) {
//   if(!err) {
//     console.log('清空聊天记录')
//   }
// })

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(9093, function () {
  console.log('node app start at port 9093')
})