import express from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from './user';
import path from 'path';
import model from './model';
const Chat = model.getModel('chat');
const app = express();

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

// Chat.remove({}, function(err, doc) {
//   if(!err) {
//     console.log('清空聊天记录')
//   }
// })

function App() {
  return <div>rock never die!</div>
}

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  res.send(renderToString(<App />))
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build'))) // static resource
server.listen(9093, function () {
  console.log('node app start at port 9093')
})