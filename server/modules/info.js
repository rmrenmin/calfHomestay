const express = require('express');
const async = require('async');
const tools = require('./tools');
const router = express.Router();

//订单相关
router.post('/order', (req, res) => {
	//订单分页 username    currPage  pageSize:每页条数
	//返回： 订单总条数  当前页数据
	let body = req.body;
	//订单状态
	let status = null;
	if(body.status == '1') {
		status = '未付款'
	} else if(body.status == '2') {
		status = '已付款'
	} else {
		status = '已取消'
	}
	//	console.log(body)
	async.waterfall([
		function(cb) {
			//			if(!tools.checkLogin(req,res)){
			//				cb(new Error('未登录'));
			//			}
			let sql = 'select u_id from user where username=?';
			conn.query(sql, body.username, (err, re) => {
				if(err) {
					tools.dbError(err, res);
					return
				}
				let sql = 'select count(*) as count from order_list where u_id1=?&&status=?';
				conn.query(sql, [re[0].u_id, parseInt(body.status)], (err, resout) => {
					if(err) {
						tools.dbError(err, res);
						return
					}
					cb(null, {
						uid: re[0].u_id,
						count: resout[0].count
					})
				})
			})
		},
		function(re, cb) {
			let count = re.count;
			//起始位置
			let start = body.currPage * body.pageSize - body.pageSize;
			if(start >= count) {
				start -= 1 * body.pageSize;
			}
			if(start < 0) {
				start = 0;
			}
			let sql = 'select * from order_list where u_id1=?&&status=? limit ?,?';
			conn.query(sql, [re.uid, parseInt(body.status), start, parseInt(body.pageSize)], (err, re) => {
				if(err) {
					tools.dbError(err, res);
					return
				}
				cb(null, [re, count])
			})

		},
		function(order, cb) {
			let count = order[1];
			order = order[0];
			let data = [];
			let l = order.length;
			//			console.log('lll',l)
			for(let index in order) {
				let sql = 'select title as description,imglist from house where h_id=?';
				conn.query(sql, order[index].h_id, (err, re) => {
					if(err) {
						tools.dbError(err, res);
						return
					}
					data.push({
						date: new Date(order[index].time).toLocaleDateString(),
						number: order[index].number,
						user: req.session.nickname,
						price: order[index].price,
						name: re[0].description,
						dateDiff: Math.ceil(new Date(new Date(order[index].end) - new Date(order[index].start)) / (1000 * 60 * 60 * 24)),
						url: JSON.parse(re[0].imglist)[0],
						status: status,
						id: order[index].o_id
					})
					//					console.log(index)
					if(index == l - 1) {
						cb(null, {
							'data': data,
							'count': count
						})
					}
				})
			}
			if(l == 0) {
				cb(null, {
					'data': order,
					'count': count
				})
			}
		}
	], (err, re) => {
		//		console.log(re)
		res.json(re)
	})
})

//订单状态修改
router.post('/orderstatus', (req, res) => {

	//			if(!tools.checkLogin(req,res)){
	//				cb(new Error('未登录'));
	//			}
	let body = req.body;
	let sql = 'update order_list set status=? where o_id=?';
	conn.query(sql, [parseInt(body.status), parseInt(body.id)], (err, re) => {
		if(err) {
			tools.dbError(err, res);
			return
		}
		res.json({
			status: 'success',
			message: '修改成功！'
		})
	})

})

//房源相关
router.post('/house', (req, res) => {
	//订单分页 username    currPage  pageSize:每页条数
	//返回： 订单总条数  当前页数据
	let body = req.body;
	//订单状态
	let status = null;
	if(body.status == '1') {
		status = '未付款'
	} else if(body.status == '2') {
		status = '已付款'
	} else {
		status = '已取消'
	}
	//	console.log(body)
	async.waterfall([
		function(cb) {
			//			if(!tools.checkLogin(req,res)){
			//				cb(new Error('未登录'));
			//			}
			let sql = 'select u_id from user where username=?';
			conn.query(sql, body.username, (err, re) => {
				if(err) {
					tools.dbError(err, res);
					return
				}
				let sql = 'select count(*) as count from house where u_id=?&&status=?';
				conn.query(sql, [re[0].u_id, parseInt(body.status)], (err, resout) => {
					if(err) {
						tools.dbError(err, res);
						return
					}
					cb(null, {
						uid: re[0].u_id,
						count: resout[0].count
					})
				})
			})
		},
		function(re, cb) {
			let count = re.count;
			//起始位置
			let start = body.currPage * body.pageSize - body.pageSize;
			if(start >= count) {
				start -= 1 * body.pageSize;
			}
			if(start < 0) {
				start = 0;
			}
			let sql = 'select * from house where u_id=?&&status=? limit ?,?';
			conn.query(sql, [re.uid, parseInt(body.status), start, parseInt(body.pageSize)], (err, re) => {
				if(err) {
					tools.dbError(err, res);
					return
				}
				cb(null, {
					data: re,
					count: count
				})
			})

		},

	], (err, re) => {
		//		console.log(re)
		for(let i in re.data) {
			re.data[i].imglist = JSON.parse(re.data[i].imglist)[0];
			re.data[i].location = JSON.parse(re.data[i].location).city;
			re.data[i].theme = re.data[i].style;
		}
		res.json(re)
	})
})

//下架房源
router.post('/housestatus', (req, res) => {

	//			if(!tools.checkLogin(req,res)){
	//				cb(new Error('未登录'));
	//			}
	let body = req.body;
	let sql = 'update house set status=? where h_id=?';
	conn.query(sql, [parseInt(body.status), parseInt(body.id)], (err, re) => {
		if(err) {
			tools.dbError(err, res);
			return
		}
		res.json({
			status: 'success',
			message: '修改成功！'
		})
	})

})

//添加房源
router.post('/add', (req, res) => {
	console.log(req.body)
	//	if(!tools.captcha(req,res)){
	//		return
	//	}
	let body = req.body;
	let sql = 'select u_id from user where username=?';
	conn.query(sql, body.username, (err, re) => {
		if(err) {
			tools.dbError(err, res);
			return
		}
		let period = JSON.stringify([body.start, body.end]);
		let location = JSON.stringify({city:'成都',district:body.location,detail:body.detail})
		let sql = 'insert into house (title,price,imglist,location,type,style,period,description,time,u_id)values(?,?,?,?,?,?,?,?,?,?)'
		conn.query(sql, [body.title, body.price, body.imgSrcList, location, body.type, body.style,period, body.textarea, new Date(), re[0].u_id], (err, re) => {
			if(err) {
				tools.dbError(err, res);
				return
			}
			res.json({
				status: 'success',
				message: '成功'
			})
		})
	})
})

module.exports = router;