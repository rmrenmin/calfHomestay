<template>
	<div>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<group>
			<x-input title="用户名" v-model="username" type="text" :required="true"></x-input>
		</group>
		<group>
			<x-input title="密码" v-model="password" type="password" :required="true"></x-input>
		</group>
		<group>
			<x-input title="验证码" v-model="captcha" type="text" :required="true"></x-input>
			<x-img :src="src" @click="upCaptcha"></x-img>
		</group>
		<group>
			<x-button text="登录" type="primary" @click.native="login"></x-button>
		</group>
	</div>
</template>

<script>
	import { XInput, XImg } from 'vux'
	export default {
		name: 'Login',
		data() {
			return {
				title: '登录',
				loginState: false,
				username: null,
				password: null,
				captcha: null,
				src: 'http://xiaoyu:81/captcha'
			}
		},
		components: {
			XInput,
			XImg,
		},
		created() {

		},
		methods: {
			upCaptcha(e) {
				this.src = 'http://xiaoyu:81/captcha?t=' + new Date()
			},
			login(e) {
				if(!(this.username&&this.password&&this.captcha)){
					this.$vux.alert.show({
							title: '信息',
							content: '有必填项未填'
					});
					return
				}
				let data = {
					username: this.username,
					password: this.password,
					captcha: this.captcha,
				}
				this.axios.post('http://xiaoyu:81/user/login', this.qs.stringify(data)).then(res => {
					console.log('登陆成功', res.data)
					if(res.data.status == 'error') {
						console.log('登陆失败')
						this.$vux.alert.show({
							title: '信息',
							content: '登录失败！'
						});
						return
					}
					for(let item in res.data.message) {
						if(res.data.message.hasOwnProperty(item)) {
							localStorage.setItem(item, res.data.message[item])
						}
					}
					localStorage.setItem('loginState', true)
					this.$router.push('/')
					this.$vux.alert.show({
						title: '信息',
						content: '登录成功！'
					});
				}).catch(err => {
					console.log('登录失败', err)
					this.$vux.alert.show({
						title: '信息',
						content: '登录失败！'
					});
				})
			}
		},
		watch: {

		}
	}
</script>

<style>

</style>