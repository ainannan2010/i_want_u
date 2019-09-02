import express from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './user';
import path from 'path';
import model from './model';
const Chat = model.getModel('chat');
const app = express();
app.use(cors())
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({ extensions: ['png'] })
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server'
import staticPath from '../build/asset-manifest.json';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from '../src/App';
import reducers from '../src/redux';

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
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  let context = {}
  let reg = /^static\/(css|js)\/.+\.chunk\.(css|js)$/
  // 匹配对象里变化的哈希值
  let load = Object.keys(staticPath.files).filter(v => reg.test(v))
  const obj = {
    '/msg': 'React聊天信息列表',
    '/boss': 'boss查看牛人列表'
  }
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="keywords" content="React,Redux,node,SSR,聊天" />
      <meta
        name="description"
        content="${obj[req.url]}"
      />
      <link rel="stylesheet" href="${staticPath['files']['main.css']}" />
      <link rel="stylesheet" href="${staticPath['files'][load[0]]}" />
      <title>I WANT U</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">`
  )
  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  )
  markupStream.pipe(res, { end: false })
  markupStream.on('end', () => {
    res.write(`</div>
        <script src="${staticPath['files']['main.js']}"></script>
        <script src="${staticPath['files']['runtime~main.js']}"></script>
        <script src="${staticPath['files'][load[1]]}"></script>
      </body>
    </html>`)
    res.end()
  })
})
app.use('/', express.static(path.resolve('build'))) // static resource
server.listen(9093, function () {
  console.log('node app start at port 9093')
})
