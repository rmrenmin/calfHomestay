const express = require('express');
const async = require('async');
const tools = require('./tools');
const router = express.Router();

//首页搜索路由
router.post('/search', (req, res) => {
	let data = req.body;
	let area = data.area || ""
	var type = "%%";
	let n = parseInt(data.number) || 10;
	if (n == 10) {
		type = '%别%';
	}
	else if (n > 2) {
		type = '%套%';
	}
	else if (n <= 2) {
		type = '%间%';
	}
	//根据信息去数据库查找
	async.waterfall([
		function (cb) {
			let sql = 'SELECT count(*) FROM house WHERE location LIKE ? AND type LIKE ?';
			conn.query(sql, [`%${area}%`, type], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, results[0]["count(*)"]);
			})
		},
		function (re, cb) {
			let sql = 'SELECT * FROM house WHERE location LIKE ? AND type LIKE ? LIMIT 6';
			conn.query(sql, [`%${area}%`, type], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, {
					data: results,
					count: re
				});
			})
		},

	], (err, re) => {
		console.log("****首页搜索结果****\n" + JSON.stringify(re));
		res.json(re)
	})
});

//首页点击风格
router.post('/style', (req, res) => {
	let data = req.body;
	async.waterfall([
		function (cb) {
			let sql = 'SELECT count(*) FROM house WHERE style LIKE ?';
			conn.query(sql, `%${data.style}%`, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, results[0]["count(*)"]);
			})
		},
		function (re, cb) {
			let sql = 'SELECT * FROM house WHERE style LIKE ? LIMIT 6';
			conn.query(sql, `%${data.style}%`, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, {
					data: results,
					count: re
				});
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
		function (cb) {
			let sql = 'SELECT count(*) FROM house WHERE style LIKE ?';
			conn.query(sql, `%${data.style}%`, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, results[0]["count(*)"]);
			})
		},
		function (re, cb) {
			let start = data.currPage * (data.pageSize - 1);
			let sql = 'SELECT * FROM house WHERE style LIKE ? LIMIT ?,?';
			conn.query(sql, [`%${data.style}%`, start, parseInt(data.pageSize)], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, {
					data: results,
					count: re.count
				})
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
		function (cb) {
			let sql = 'SELECT count(*) FROM house WHERE style LIKE ? AND location LIKE ? AND type LIKE ? AND price BETWEEN ? AND ?';
			conn.query(sql, [`%${data.style}%`, `%${data.data.area}%`, `%${data.data.type}%`, data.data.price[0], data.data.price[1]], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, results[0]["count(*)"]);
			})
		},
		function (re, cb) {
			let sql = 'SELECT * FROM house WHERE style LIKE ? AND location LIKE ? AND type LIKE ? AND price BETWEEN ? AND ? LIMIT 6';
			conn.query(sql, [`%${data.style}%`, `%${data.data.area}%`, `%${data.data.type}%`, data.data.price[0], data.data.price[1]], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null, {
					data: results,
					count: re
				});
			})
		},

	], (err, re) => {
		// console.log("****条件查询结果****\n"+JSON.stringify(re));
		res.json(re)
	})

});

//houseinfo
router.post('/house', (req, res) => {
	let h_id = req.body.h_id;
	let data={};
	async.waterfall([
		function (cb) {
			let sql = 'SELECT * FROM house WHERE h_id = ?';
			conn.query(sql, h_id, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				data.house=results[0];
				cb(null,data);
			})
		},
		function (re, cb) {
			let sql = 'SELECT * FROM user WHERE u_id = ?';
			conn.query(sql, re.house.u_id, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				data.user=results[0];
				cb(null,data);
			})
		},
		function (re, cb) {
			let sql = 'SELECT * FROM comment WHERE h_id=?';
			conn.query(sql, h_id, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				data.comment=results||[];
				cb(null,data);
			})
		},

	], (err, re) => {
		// console.log("****houseinfo结果****\n"+JSON.stringify(re));
		res.json(re)
	})

});

//下订单
router.post('/order', (req, res) => {
	let data = req.body;
	let start=new Date( JSON.parse(data.period)[0]);
	let end=new Date( JSON.parse(data.period)[1]);
	data.time=new Date();
	async.waterfall([
		function (cb) {
			let sql = 'SELECT u_id FROM user WHERE username= ?';
			conn.query(sql, data.username, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				data.u_id1=results[0].u_id;
				cb(null);
			})
		},
		function (cb) {
			let number=Date.parse(new Date());
			let sql = 'insert into order_list (time,price,period,h_id,u_id1,number,start,end) values (?,?,?,?,?,?,?,?)';
			conn.query(sql,[data.time,data.price,data.period,data.h_id,data.u_id1,number,start,end], (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				cb(null);
			})
		},		
	], (err) => {
		res.json({re:"ok"});
	})

});

module.exports = router;