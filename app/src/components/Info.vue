<template>
	<view-box>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<view-box>
			<group style="text-align: center;">
				<x-img :src="imgsrc" default-src="http://localhost:81/upload/1.jpg" class="header"></x-img>
			</group>
			<group>
				<x-input title="用户名" v-model="username" type="text" disabled></x-input>
			</group>
			<group>
				<x-input title="昵称" v-model="nickname" type="text" :disabled="!disabled"></x-input>
			</group>
			<group>
				<x-input title="手机号" v-model="tel" type="tel" is-type="china-mobile" :disabled="!disabled"></x-input>
			</group>
			<group v-if="disabled">
				<x-input title="原密码" v-model="password" type="password"></x-input>
			</group>
			<group v-if="disabled">
				<x-input title="新密码" v-model="newpassword" type="password"></x-input>
			</group>
			<group v-if="disabled">
				<x-input title="验证新密码" v-model="repassword" type="password"></x-input>
			</group>
			<group v-if="disabled">
				<x-input title="验证码" v-model="captcha" type="text"></x-input>
				<x-img :src="src" @click.native="upCaptcha"></x-img>
			</group>
			<group>
				<x-button :text="text" type="primary" @click.native="change"></x-button>
			</group>
		</view-box>
		<x-button link='/register' text="注册"></x-button>
		<x-button text="退出" v-if="loginState" @click.native="logout"></x-button>
		<x-button link="/login" text="登录" v-else="loginState"></x-button>
	</view-box>
</template>

<script>
	import { XInput, XImg, PopupRadio, Datetime } from 'vux'
	export default {
		name: 'Info',
		data() {
			return {
				title: '个人中心',
				loginState: localStorage.getItem('loginState'),
				text: '修改',
				disabled: false,
				src: 'http://localhost:81/captcha',
				imgsrc:localStorage.getItem('imgsrc'),
				//账户信息
				username: localStorage.getItem('username'),
				nickname: localStorage.getItem('nickname'),
				sex: localStorage.getItem('sex'),
				imgsrc: localStorage.getItem('imgsrc'),
				birthday: localStorage.getItem('birthday'),
				tel: localStorage.getItem('tel'),
				//修改
				password: null,
				newpassword: null,
				repassword: null,
				captcha: null
			}
		},
		components: {
			XInput,
			XImg,
			PopupRadio,
			Datetime
		},
		created() {
			console.log(localStorage.getItem('username'))
			console.log('登录状态：', this.loginState)
			if(!this.loginState) {
				this.$router.replace('/loginregister');
			}
		},
		methods: {
			upCaptcha(e) {
				this.src = 'http://localhost:81/captcha?t=' + new Date()
			},
			logout(e) {
				this.axios.get('http://localhost:81/user/logout').then(res => {
					console.log(res.data);
					localStorage.clear();
					this.$router.push('/')
				}).catch(err => {
					console.log(err)
				})
			},
			change(e) {
				if(this.text == '修改') {
					this.text = '保存';
					this.disabled = true
					return
				}
				if(this.repassword == null || this.repassword != this.newpassword) return
				let data = {
					username: this.username,
					nickname: this.nickname,
					birthday: this.birthday,
					newPassword: this.newpassword,
					password: this.password,
					tel: this.tel,
					sex: this.sex,
					captcha: this.captcha

				}
				this.axios.post('http://localhost:81/user/update', this.qs.stringify(data)).then(res => {
					console.log(res.data)
					if(res.data.status == 'success') {
						this.$vux.alert.show({
							title: '信息',
							content: '修改成功！'
						});
						for(let item in data) {
							if(item == 'captcha' || item == 'newPassword' || item == 'password') {
								continue
							}
							if(res.data.message.hasOwnProperty(item)) {
								localStorage.setItem(item, data[item])
							}
						}
							this.password=null,
							this.newpassword=null,
							this.repassword=null,
							this.captcha=null
					}
				})
				this.text = '修改';
				this.disabled = false
			}
		}
	}
</script>

<style>
	.header{
		width: 100px;
		height: 100px;
		border-radius: 50px;
	}
</style>