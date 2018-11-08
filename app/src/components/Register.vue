<template>
	<view-box>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<group>
			<x-input title="用户名" v-model="username" type="text" :required="true"></x-input>
		</group>
		<group>
			<x-input title="密码" v-model="password" type="password" :required="true"></x-input>
		</group>
		<group>
			<x-input title="验证密码" v-model="repassword" type="password" :required="true"></x-input>
		</group>
		<group>
			<x-input title="电话号码" v-model="tel" type="tel" is-type="china-mobile" :required="true"></x-input>
		</group>
		<group>
			<popup-radio title="性别" :options="options" v-model="sex">
				<p slot="popup-header" class="vux-1px-b demo3-slot">性别</p>
			</popup-radio>
		</group>
		<group title="生日">
			<datetime v-model="birthday" title="生日"></datetime>
		</group>
		<group>
			<x-input title="验证码" v-model="captcha" type="text" :required="true"></x-input>
			<x-img :src="src" @click.native="upCaptcha"></x-img>
		</group>
		<group>
			<x-button text="注册" type="primary" @click.native="register"></x-button>
		</group>
	</view-box>
</template>

<script>
	import { XInput, XImg, PopupRadio, Datetime } from 'vux'
	export default {
		name: 'Register',
		data() {
			return {
				title: '注册',
				options: ['男', '女'],
				username: null,
				password: null,
				repassword: null,
				captcha: null,
				tel: '',
				sex: '男',
				birthday: '1900-01-01',
				src: 'http://xiaoyu:81/captcha'
			}
		},
		components: {
			XInput,
			XImg,
			PopupRadio,
			Datetime,
		},
		created() {
			console.log('register component')
		},
		methods: {
			upCaptcha(e) {
				this.src = 'http://xiaoyu:81/captcha?t=' + new Date()
			},
			register(e) {
				if(!(this.username&&this.password&&this.captcha&&this.repassword&&this.tel)){
					this.$vux.alert.show({
							title: '信息',
							content: '有必填项未填'
					});
					return
				}
				if(this.password != this.repassword) return;
				let data = {
					username: this.username,
					password: this.password,
					repassword: this.repassword,
					sex: this.sex,
					birthday: this.birthday,
					tel: this.tel,
					captcha: this.captcha,
				}
				console.log(data)
				this.axios.post('http://xiaoyu:81/user/register', this.qs.stringify(data)).then(res => {
					console.log('注册成功', res.data)
					this.axios.get('http://xiaoyu:81/user/logout').then(res => {
						console.log(res.data);
					}).catch(err => {
						console.log(err)
					})
					this.$router.push('/login')
					localStorage.clear()
					this.$vux.alert.show({
						title: '信息',
						content: '注册成功！'
					});

				}).catch(err => {
					console.log('注册失败', err)
				})
			}
		}

	}
</script>

<style>

</style>