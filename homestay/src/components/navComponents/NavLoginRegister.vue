<template>
	<div class="lr">
		<div v-if="!$store.state.user.state">
			<router-link to="/login">登录</router-link>
			<span>|</span>
			<router-link to="/register">注册</router-link>
		</div>
		<div v-if="$store.state.user.state" class="logout">
			<NavHeader href="/info/account" :src="$store.state.user.imgSrc" :nickname="$store.state.user.nickname"/>
			<ul>
				<li @click="logout">退出</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import NavHeader from './NavHeader';
	export default{
		name:'NavLoginRegister',
		data(){
			return{
//				src:Header,
//				username:'默认'
			}
		},
		components:{
			NavHeader,
		},
		methods:{
			logout(e){//退出登录
				this.axios.get('http://xiaoyu:81/user/logout').then(res=>{
					console.log(res.data);
					this.$store.commit('logout');
					//清空localStorage
					localStorage.clear();
					//删除cookies
//					document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
					this.$router.replace('/')
				}).catch(err=>{
					console.log('退出时axios错误',err)
				})
			}
		}
	}
</script>

<style scoped>
	.lr{
		display: inline-block;
		margin-left:10px;
	}
	.lr a {
		display: inline-block;
		line-height: 60px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		color: white;
		margin: 0px;
		padding: 0px;
	}
	.lr>a:after{
		content: '';
		clear: both;
	}
	span{
		color: white !important;
	}
	.logout{
		position: relative;
	}
	.logout>ul{
		display: none;
		position: absolute;
		border: 1px solid black;
		border-radius: 5px;
		width: 40px;
		height: 23px;
		padding: 5px 5px;
		font-size: 14px;
		font-weight: 400;
		line-height: 23px;
		list-style: none;
		background-color: white;
		top: 50px;
		left: 25px;
		cursor: pointer;
	}
	.logout:hover > ul{
		display: block;
	}
</style>