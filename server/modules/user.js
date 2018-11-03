const express = require('express');
const async = require('async');
const tools = require('./tools');
const router = express.Router();

//注册路由
router.post('/register', (req, res) => {
       console.log(req.body)
    //验证码验证
//  if(!tools.captcha(req,res)) return;       //部署时去掉注释
    let body = req.body;
    async.waterfall([
        function (cb) { //检测账户名是否存在
            let sql = 'select username from user where username=?';  //根据项目修改
            conn.query(sql, body.username, (err, results) => {
                if (err) {
                    tools.dbError(err,res);
                    return;
                }
                cb(null, results.length);
            })
        },
        function (count, cb) { //完成数据库写入操作
            if (count !== 0) {
               tools.dbError('账户名已存在！',res,'账户名已存在！')
                return;
            }
            // let headersrc = req.session.headersrc[0] || '/upload/default.jpg';
            let sql = 'insert into user (username,password,tel,birthday,sex,nickname)values(?,?,?,?,?,?)';   //根据项目修改
            let nickname = tools.randomString();
            conn.query(sql, [body.username, body.password, body.tel, new Date(body.birthday),body.sex,nickname], (err, results) => {
                if (err) {
                    tools.dbError(err,res);
                    return;
                }
                res.json({
                    status: 'ok',
                    message: "注册成功！"
                });
                cb(null, {
                    status: 'ok'
                })
            })
        }
    ], (err, result) => {
        console.log(result);
    })

})

//登录路由
router.post('/login', (req, res) => {
//  console.dir(req.body);
    //验证码验证
//  if(!tools.captcha(req,res)) return;         //部署时去掉注释
    let body = req.body;
    async.series({
        login: function (cb) {
            let sql = 'select * from user where username=?';
            conn.query(sql, body.username, (err, results) => {
                if (err) {
                    tools.dbError(err,res);
                    return;
                }
                if (results.length === 0) {
                    tools.dbError('账户不存在！',res,'账户不存在！');
                    return;
                }
                if (results[0].password === body.password) {
                    req.session.username = results[0].username;  //根据项目修改
                    req.session.nickname = results[0].nickname;  //根据项目修改
                    req.session.imgsrc = results[0].imgsrc;  //根据项目修改
                    req.session.tel = results[0].tel;  //根据项目修改
                    req.session.sex = results[0].sex;  //根据项目修改
                    req.session.birthday = results[0].birthday;  //根据项目修改
                    res.json({
                        status: 'ok',
                        message: {
                        	imgsrc:results[0].imgsrc,
                        	username:results[0].username,
                        	tel:results[0].tel,
                        	sex:results[0].sex,
                        	nickname:results[0].nickname,
                        	birthday:results[0].birthday,
                        },
                        
                    });
                    cb(null, {
                        status: 'success'
                    });
                } else {
                    res.json({
                        status: 'error',
                        message: '密码错误！'
                    });
                }
            });

        },
        // update: function (cb) { //修改最后登录时间
        //     let sql = 'update users set time=? where username=?';
        //     conn.query(sql, [new Date().toLocaleString(), body.username], (err, results) => {
        //         if (err) {
        //             console.log(err);
        //             return;
        //         }
        //         cb(null, {
        //             status: 'ok'
        //         });
        //     });

        // }
    }, (err, result) => {
        console.log(result);
    })


})

//退出路由
router.get('/logout',(req,res)=>{
	console.log('退出成功')
	req.session=null;
	res.json({
		status:'success',
		message:'退出成功！'
	})
})

//修改路由
router.post('/update', (req, res) => {
    let body = req.body;
//	console.log(body)
	//检查是否登录
    if(!tools.checkLogin(req,res))return;
    
    //验证码验证
//  if(!tools.captcha(req,res)) return;       //部署时去掉注释

	let sql = 'select * from user where username=?';
    conn.query(sql, body.username, (err, results) => {
        if (err) {
        tools.dbError(err,res);
            return;
        }
        if (results.length === 0) {
            tools.dbError('账户不存在！',res,'账户不存在！');
            return;
        }
        if (results[0].password === body.password) {
            let sql = 'update user set username=?,password=?,tel=?,birthday=?,sex=?,nickname=? where username=?';   	
            conn.query(sql,[body.username,body.newPassword,body.tel,new Date(body.birthday),body.sex,body.nickname,body.username],(err,results)=>{
            	if (err) {
        			tools.dbError(err,res);
            		return;
        		}
//          	console.log('session',req.session)
            	req.session.username = body.username;  //根据项目修改
                req.session.nickname = body.nickname;  //根据项目修改
                req.session.tel = body.tel;  //根据项目修改
                req.session.sex = body.sex;  //根据项目修改
                req.session.birthday = body.birthday;  //根据项目修改
                res.json({
                	status:'success',
                	message:'修改成功！'
            	})
                console.log('修改成功！')
        })}else {
            res.json({
	            status: 'error',
	            message: '密码错误！'
        	});
        }

    })
})


module.exports = router;