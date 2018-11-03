const express = require('express');
const async = require('async');
const tools = require('./tools');
const router = express.Router();

//首页搜索路由
router.post('/search', (req, res) => {
    let data = req.body;
    console.log("===search:" + JSON.stringify(data));
    //根据信息去数据库查找
    res.send({
        r: 'ok'
    });
});

//首页点击风格
router.post('/style', (req, res) => {
    let data = req.body;
    console.log("===filter:" + JSON.stringify(data.style));
    //根据信息去数据库查找
    let sql = 'SELECT * FROM house WHERE style LIKE ?';
    conn.query(sql, `%${data.style}%`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("*************风格查询结果***********\n" + JSON.stringify(results));
        res.json({
            results:results
        });
    })
});

module.exports = router;