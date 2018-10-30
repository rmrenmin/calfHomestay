<template>
	<router-link :to="href">
		<img :src="src" />
		<span>
			{{username}}
		</span>
	</router-link>
</template>

<script>
	export default{
		name:'NavHeader',
		props:['href','username','src'],
		data(){
			return{
				
			}
		}
	}
	
</script>

<style scoped>
	a {
		display: inline-block;
		line-height: 60px;
		margin-left:10px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		margin-left:20px !important;
		color: white;
	}
	a:after{
		content: '';
		clear: both;
	}
	img {
		display: inline-block;
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 1px;
		border-radius: 50%;
	}
</style>