<template>
	<view-box>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<view-box class="box">
	
			<x-button text="登录" @click.native="login"></x-button>
			<x-button text="注册" @click.native="register"></x-button>
		</view-box>
	</view-box>
</template>

<script>
	export default{
		name:'LoginRegister',
		data(){
			return{
				title:'登录和注册'
			}
		},
		methods:{
			login(e){
				this.$router.push('/login')
			},
			register(e){
				this.$router.push('/register')
			}
		}
	}
</script>

<style>
	.box{
		padding-top: 100px;
	}
</style>