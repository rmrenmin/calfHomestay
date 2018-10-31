const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const svgCaptcha = require('svg-captcha');
const tools = require('./modules/tools');
const fs = require('fs');
const path = require('path');

//服务器创建
const app = express();

//定义参数
let secret = 'calfHomestay';
let hostname = 'http://localhost:80/';
//中间键
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(secret));

//CORS：允许跨域
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//静态托管
app.use(express.static('static'));
app.use('/upload',express.static('upload'));

//端口
app.listen('80', function () {
    console.log('服务器启动成功');
});

//数据库
global.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'homestay'
});
conn.connect();

//session
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 3600 * 1000
    }
}));

//文件上传位置
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 递归创建目录 同步方法
        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true;
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname);
                    return true;
                }
            }
        }
        mkdirsSync(`./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2,'0')}`);
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2,'0')}`);
    },
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' + Math.random().toString().substr(2) + '.' + file.originalname.split(".").pop();
        cb(null, filename);
    }
});

const upload = multer({
    storage: diskStorage
});

//验证码
app.get('/captcha', (req, res) => {
    var captcha = svgCaptcha.create({
        size: 1,
        color: true,
        noise: 2,
        ignoreChars: '0o1il',
        background: "#cc9966"
    });
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

//上传图片接口
app.post('/upload', upload.array('images'), (req, res) => {
    let data = [];
    for (const ad of req.files) {
        let path = hostname + ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        'error': 0,
        'data': data
    });
});

//头像上传图片接口
app.post('/header', upload.array('images'), (req, res) => {
    let data = [];
    for (const ad of req.files) {
        let path = hostname + ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        'error': 0,
        'data': data
    });
});
//用户相关路由
app.use('/user', require('./modules/user'));

app.use('/test',(req,res)=>{
    let s = req.session
    console.log(s)
})
