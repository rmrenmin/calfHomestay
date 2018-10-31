<template>
	<router-link :to="href">
		<img :src="src" />
		<span :title="nickname">
			{{nickname}}
		</span>
	</router-link>
</template>

<script>
	export default{
		name:'NavHeader',
		props:['href','nickname','src'],
		data(){
			return{
				
			}
		},
		watch:{
			src(){
				console.log('watch',this.src)
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
	span{
		display: inline-block;
		width: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: middle;
	}
</style>