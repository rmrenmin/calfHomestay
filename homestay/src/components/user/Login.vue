<template>
	<div class="login-box" type="flex">
		<el-row justify="center" class="login-row">
			<el-col :span="18" :offset="3">
				<el-input id="username" v-model="username" placeholder="请输入帐号" size="medium">
					<template slot="prepend">帐号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="login-row">
			<el-col :span="18" :offset="3">
				<el-input id="password" v-model="password" type="password" placeholder="请输入密码" size="medium">
					<template slot="prepend">密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" :gutter="10" class="login-row">
			<el-col :span="12" :offset="3">
				<el-input id="captcha" v-model="captcha" placeholder="请输入验证码" size="medium">
					<template slot="prepend">验证码</template>
				</el-input>
			</el-col>
			<el-col :span="6">
				<img :src="src" @click="changeClick" />
			</el-col>
		</el-row>
		<el-row justify="center" class="login-row">
			<el-col :span="18" :offset="3">
				<el-button id="login-btn" v-on:click="login" style="width:100%" type="primary">登录</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				captcha: null,
				username: null,
				password: null,
				src: 'http://xiaoyu:81/captcha',
			}
		},
		methods: {
			login(e) {
				if(!this.username){
					this.tip('用户名未输入')
					return
				}
				if(!this.password){
					this.tip('密码未输入')
					return
				}
				if(!this.captcha){
					this.tip('验证码未输入')
					return
				}
				let data = this.qs.stringify({
					username: this.username,
					password: this.password,
					captcha: this.captcha
				});
				this.axios.post('http://xiaoyu:81/user/login', data).then(res => {
					//					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
					} else { //登录成功修改状态
						let user = {
							imgSrc: res.data.message.imgsrc,
							username: res.data.message.username,
							tel: res.data.message.tel,
							sex: res.data.message.sex,
							nickname: res.data.message.nickname,
							birthday: res.data.message.birthday,
							state:true,
						};
						this.$store.commit('login', user);
						this.$store.commit('loginState');
						//将登陆状态保存到localStorage
						for(let item in user){
							localStorage.setItem(item,user[item])
						}
						//将connect.sid保存到localStorage
//						console.log(document.cookieParser)
//						localStorage.setItem('connect.sid',this.getCookie('connect.sid'))
						this.$router.push('/')
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
		beforeCreate: function() { //防止用户重复登录
			if(this.$store.state.user.state) {
				console.log('已经登录，不需要重复登录！')
				this.$router.push({
					name: 'Index'
				})
			}
		}
	}
</script>

<style scoped>
	.login-box {
		position: relative;
		left: calc(50% - 200px);
		/*top: calc(50% - 400px);*/
		padding: 50px 0px;
		width: 400px;
		border: 1px solid black;
		border-radius: 10px;
		box-shadow: 4px 4px 4px 3px rgba(136, 136, 136, 0.5), -4px -4px 4px 3px rgba(136, 136, 136, 0.5);
	}
	
	.login-row {
		height: 50px;
	}
	
	.login-box img {
		width: 80px;
		height: 36px;
	}
</style>