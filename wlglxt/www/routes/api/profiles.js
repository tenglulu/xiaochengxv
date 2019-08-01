const express = require('express');
const passport = require('passport');
const Profile = require('../../models/Profile');

const router = express.Router();

// $route GET api/profiles/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({
    msg: 'profile works'
  });
});

// $route POST api/profiles/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let profileFileds = {};
  console.log(req.body)
  // if (req.body.carNum) {
  //   profileFileds.carNum = req.body.carNum;
  // }
  if (req.body.chePaiHao) {
    profileFileds.chePaiHao = req.body.chePaiHao;
  }
  if (req.body.type) {
    profileFileds.type = req.body.type;
  }
  if (req.body.describe) {
    profileFileds.describe = req.body.describe;
  }
  if (req.body.state) {
    profileFileds.state = req.body.state;
  }
  new Profile(profileFileds).save().then(profile => {
    res.json(profile);
  })
})

// $route GET api/profiles
// @desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  let query = {}
  let limit = 8
  let skip = 0
  let sum = 0
  console.log('------',req.query)
  for (i in req.query) {
    if (i === 'chePaiHao') {
      query.chePaiHao = req.query.chePaiHao
    } else if (i === 'pageSize') {
      limit = req.query.pageSize
    } else if (i === 'currentPage') {
      skip = (req.query.currentPage - 1) * req.query.pageSize
    } else {
      query[`${i}`] = req.query[i]
    }
  }
  console.log(query)
  Profile.find(query).countDocuments((err,sum)=>{
    if(err) {
      console.log(err)
    } else {
      sum = sum
      Profile.find(query).limit(Number(limit)).skip(Number(skip))
        .then(profile => {
          if (!profile) {
            return res.status(404).json('没有任何内容');
          }
          res.json({
            sum,
            data: profile
          });
        })
        .catch(err => {
          console.log(err)
          res.status(400).json('查询失败');
        })
    }
  })

})

// $route GET api/profiles/:id
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    _id: req.params.id
  })
    .then(profile => {
      if (!profile) {
        return res.status(404).json('没有任何内容');
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route POST api/profiles/edit/:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log(req.body)
  let profileFileds = {};
  if (req.body.chePaiHao) {
    profileFileds.chePaiHao = Number(req.body.chePaiHao);
  }
  if (req.body.type) {
    profileFileds.type = req.body.type;
  }
  if (req.body.describe) {
    profileFileds.describe = req.body.describe;
  }
  if (req.body.state) {
    profileFileds.state = req.body.state;
  }
  console.log(profileFileds)
  Profile.findOneAndUpdate({
    _id: req.params.id
  }, {
      $set: profileFileds
    }, {
      new: true
    }).then(profile => res.json(profile))
})

// $route POST api/profiles/delete/:id
// @desc 删除信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOneAndRemove({
    _id: req.params.id
  })
    .then(profile => {
      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json('删除失败'))
})

module.exports = router;
