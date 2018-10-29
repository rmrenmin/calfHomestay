//公用函数方法

//验证码验证
module.exports.captcha = (req,res)=>{
    /**
     * req 请求对象
     * 
     * 验证码不正确返回false，否则返回true
     */
    if (!req.session.captcha || req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
        // console.log('tools',req.session.captcha)
        res.json({
            status: 'error',
            message: '验证码错误！'
        })
        return false;
    }
    return true
}

//数据库错误
module.exports.dbError = (err,res,message="数据库错误！")=>{
    console.log(err);
    res.json({
        status: 'error',
        message: message
    });
}

//图片上传
module.exports.uploadimg = (req, res) => {
    let data = [];
    for (const ad of req.files) {
        let path = hostname + ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    console.log(data)
    return data;
}