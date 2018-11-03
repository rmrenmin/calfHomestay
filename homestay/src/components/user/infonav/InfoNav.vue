<template>
	<el-button type="info" plain @click="toHref">
		<slot></slot>
	</el-button>
</template>

<script>
	export default{
		name:'InfoNav',
		props:['href'],
		data(){
			return{

			}
		},
		methods:{
			toHref(e){//子路由跳转
				this.$router.push({path:`/info/${this.href}`})
			},
		}
	}
</script>

<style>
</style>