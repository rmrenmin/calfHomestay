<template>
	<div class="register-box" type="flex">
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<el-input id="username" v-model="username" placeholder="请输入帐号">
					<template slot="prepend">帐号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<el-input id="tel" v-model="tel" placeholder="手机号">
					<template slot="prepend">手机号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<div class="block">
					<div class="el-input el-input-group el-input-group--prepend">
						<div class="el-input-group__prepend">出生日期</div>
						<el-date-picker v-model="birthday" align="center" type="date" placeholder="选择日期">
						</el-date-picker>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend sex">性别</div>
					<div class="el-input__inner">
						<el-radio v-model="sex" label="男">男</el-radio>
	  					<el-radio v-model="sex" label="女">女</el-radio>
					</div>	
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<el-input id="password" v-model="password" type="password" placeholder="请输入密码">
					<template slot="prepend">密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" :gutter="10" class="register-row">
			<el-col :span="18" :offset="3">
				<el-input id="repassword" v-model="rePassword" type="password" placeholder="请再次输入密码">
					<template slot="prepend">验证密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="12" :offset="3">
				<el-input id="captcha" v-model="captcha" placeholder="请输入验证码">
					<template slot="prepend">验证码</template>
				</el-input>
			</el-col>
			<el-col :span="6">
				<img :src="src" @click="changeClick" />
			</el-col>
		</el-row>
		<el-row justify="center" class="register-row">
			<el-col :span="18" :offset="3">
				<el-button id="register-btn" v-on:click="register" style="width:100%" type="primary">注册</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Register',
		data() {
			return {
				captcha: null,
				username: '',
				password: '',
				rePassword: '',
				tel: '',
				src: 'http://xiaoyu:81/captcha',
				//日期相关
				birthday: '1900-01-01',
				sex:'男'
			}
		},
		methods: {
			register(e) {
				//用户名正则，4到16位（字母，数字，下划线，减号）
				var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
				if(!uPattern.test(this.username)){
					this.tip('用户名为4到16位（字母，数字，下划线，减号）')
					return
				}
				//手机号正则
				var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
				if(!mPattern.test(this.tel)){
					this.tip('手机号有误')
					return
				}
				//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
				var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
				if(!pPattern.test(this.password)){
					this.tip('密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
					return
				}
        		
        		//以前代码
				if(this.rePassword !== this.password) {
					this.tip('两次密码不一致')
					return
				}
				if(!this.captcha) {
					this.tip('验证码未输入')
					return
				}
				let data = this.qs.stringify({
					username: this.username,
					password: this.password,
					birthday: this.birthday,
					sex: this.sex,
					tel: this.tel,
					captcha: this.captcha,
				});
				this.axios.post('http://xiaoyu:81/user/register', data).then(res => {
					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
					} else { //注册成功，跳转到登录页面
						this.$router.push('/login')
					}
				}).catch(err => {
					this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
					console.log(err)
				})
			},
			changeClick(e) {
				this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
			},
			tip(m="消息"){
				this.message({
					type:'error',
					center:true,
					message:this.$createElement('p',{style:'z-index:9999;'},m)
				})
			}
		},
		
	}
</script>

<style scoped>
	.register-box {
		position: relative;
		left: calc(50% - 200px);
		/*top: calc(50% - 400px);*/
		padding: 50px 0px;
		width: 400px;
		border: 1px solid black;
		border-radius: 10px;
		/*box-shadow: 5px 5px 4px #e3e3e3;*/
		box-shadow: 4px 4px 4px 2px rgba(136, 136, 136, 0.5), -4px -4px 4px 2px rgba(136, 136, 136, 0.5);
	}
	
	.register-row {
		height: 50px;
	}
	
	.register-box img {
		width: 80px;
		height: 36px;
	}
	.el-date-editor {
		width: 100% !important;
	}
	.sex {
		height: 40px;
	}
</style>