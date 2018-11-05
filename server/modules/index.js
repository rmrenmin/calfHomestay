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
    async.waterfall([
		function(cb) {
            let sql = 'SELECT count(*) FROM house WHERE style LIKE ?';
            conn.query(sql, `%${data.style}%`,(err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                cb(null,results[0]["count(*)"]);
			})
		},
		function(re, cb) {
			let sql = 'SELECT * FROM house WHERE style LIKE ? LIMIT 6';
			conn.query(sql,`%${data.style}%`, (err, results) => {
				if(err) {
					console.log(err);
                    return;
				}
                cb(null, {data:results,count:re});
			})
		},
		
	], (err, re) => {
        // console.log("****查询结果****\n"+JSON.stringify(re));
		res.json(re)
	})

});


//页码
router.post('/page', (req, res) => {
    let data = req.body;
    async.waterfall([
		function(cb) {
            let sql = 'SELECT count(*) FROM house WHERE style LIKE ?';
            conn.query(sql, `%${data.style}%`,(err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                cb(null,results[0]["count(*)"]);
			})
		},
		function(re, cb) {
            let start = data.currPage * (data.pageSize - 1);
			let sql = 'SELECT * FROM house WHERE style LIKE ? LIMIT ?,?';
			conn.query(sql, [`%${data.style}%`,start, parseInt(data.pageSize)], (err, results) => {
				if(err) {
					console.log(err);
                    return;
				}
				cb(null, {data:results, count:re.count})
			})
		},
		
	], (err, re) => {
        // console.log("****page查询结果****\n"+JSON.stringify(re));
		res.json(re)
	})

});

//风格页面搜索
router.post('/style/search', (req, res) => {
    let data = req.body;
    async.waterfall([
		function(cb) {
            let sql = 'SELECT count(*) FROM house WHERE style LIKE ? AND location LIKE ? AND type LIKE ? AND price BETWEEN ? AND ?';
            conn.query(sql,[`%${data.style}%`,`%${data.data.area}%`,`%${data.data.type}%`,data.data.price[0],data.data.price[1]],(err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                cb(null,results[0]["count(*)"]);
			})
		},
		function(re, cb) {
			let sql = 'SELECT * FROM house WHERE style LIKE ? AND location LIKE ? AND type LIKE ? AND price BETWEEN ? AND ? LIMIT 6';
			conn.query(sql,[`%${data.style}%`,`%${data.data.area}%`,`%${data.data.type}%`,data.data.price[0],data.data.price[1]], (err, results) => {
				if(err) {
					console.log(err);
                    return;
				}
                cb(null, {data:results,count:re});
			})
		},
		
	], (err, re) => {
        // console.log("****条件查询结果****\n"+JSON.stringify(re));
		res.json(re)
	})

});

module.exports = router;