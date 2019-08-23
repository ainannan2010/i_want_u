const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { pwd: 0, __v: 0 };

// 获取权限
Router.get('/info', function (req, res) {
  const { userId } = req.cookies;

  if (!userId) {
    return res.json({ code: 1 });
  }

  User.findOne({ _id: userId }, _filter, function (e, d) {
    if (e) {
      return res.json({ code: 1, msg: '后台出错了' });
    }
    if (d) {
      return res.json({ code: 0, data: d });
    }
  })
})

// 注册
Router.post('/register', function (req, res) {
  console.log('req.body_redister: ', req.body);
  const { user, pwd, type } = req.body;
  User.findOne({ user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名已存在' })
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const { user, type, _id } = d;
      res.cookie('userId', _id);
      return res.json({ code: 0, data: { user, type, _id } })
    })
    // User.create({ user, type, pwd: md5Pwd(pwd) }, function(e, d) {
    //   if (e) {
    //     return res.json({ code: 1, msg: '后端出错了' })
    //   } else {
    //     res.json({ code: 0 })
    //   }
    // })
  })
})

// 登陆
Router.post('/login', function (req, res) {
  console.log('req.body_login: ', req.body);
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie('userId', doc._id);
    return res.json({ code: 0, data: doc });
  })
})

// 更新用户其他信息
Router.post('/update', function (req, res) {
  console.log('req.body_update: ', req.body);
  const userId = req.cookies.userId;
  if (!userId) {
    // return json.dumps({ code: 1 })
    return res.json({ code: 1 })
  }
  const body = req.body;
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data });
  })
})

// 获取人员列表
Router.get('/list', function (req, res) {
  const { type } = req.query;
  // User.remove({}, function(e, d){}) // 清空数据库用户表
  User.find({ type }, _filter, function (err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

// 获取聊天列表
Router.get('/getmsglist', function (req, res) {
  const { userId } = req.cookies;
  User.find({}, function (err, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    Chat.find({ '$or': [{ from: userId }, { to: userId }] }, _filter, function (err, doc) {
      if (!err) {
        return res.json({ code: 0, msg: doc, users })
      }
    })
  })

})

function md5Pwd(pwd) {
  const slat = '1234567890!@#$%^&*(QWERTYUIOzxcvbnm';
  return utils.md5(utils.md5(pwd + slat));
}
module.exports = Router;
