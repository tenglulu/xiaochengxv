const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body')
const cloud = require('tcb-admin-node');
//初始化路由
const router = new Router({
    prefix: "/fellow"
});
//跨域处理
app.use(cors({
    // origin: ['http://localhost:9528'],
    origin: function (ctx) {
        return [ctx.request.header.origin];
    },
    maxAge: 5,
    credentials: true
}));
//请求参数格式化
app.use(koaBody());

//小程序初始化
cloud.init({
    secretId: 'AKIDV6Ue4JzEyWpupY9HG4dwjHk192mGYK5p',
    secretKey: 'vfAYq3OUIrFOMCrUuzDCNLpDMG8qQqCO',
    env: "test-4c39c3"
});


let user = require('./controller/user.js');
router.use('/user', user.routes());

//使用router
app.use(router.routes());

//创建监听 端口号
app.listen(3000);
console.log("server runing")