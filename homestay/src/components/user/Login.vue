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
				captcha: '',
				username: '',
				password: '',
				src: 'http://localhost/captcha',
			}
		},
		methods: {
			login(e) {
				let data = this.qs.stringify({
					username: this.username,
					password: this.password,
					captcha: this.captcha
				});
				this.axios.post('http://localhost/user/login', data).then(res => {
					//					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://localhost/captcha?t=' + new Date();
					} else { //登录成功修改状态
						this.$store.commit('login', {
							imgSrc: res.data.message.imgsrc,
							username: res.data.message.username,
							tel: res.data.message.tel,
							sex: res.data.message.sex,
							nickname: res.data.message.nickname,
							birthday: res.data.message.birthday,
						});
						this.$router.push('/')
					}
				}).catch(err => {
					this.src = 'http://localhost/captcha?t=' + new Date();
					console.log(err)
				})
			},
			changeClick(e) {
				this.src = 'http://localhost/captcha?t=' + new Date();
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
		box-shadow: 4px 4px 4px 2px rgba(136, 136, 136, 0.5), 8px 8px 8px 4px rgba(136, 136, 136, 0.3);
	}
	
	.login-row {
		height: 50px;
	}
	
	.login-box img {
		width: 80px;
		height: 36px;
	}
</style>