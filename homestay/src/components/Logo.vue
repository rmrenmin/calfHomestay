<template>
	<h1>
		<a href="#">
			<img src="../assets/calf.jpg"/>
			<span>
				小牛民宿
			</span>
		</a>
	</h1>
</template>

<script>
	export default{
		name:'Logo',
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		vertical-align: middle;
	}
	a{
		line-height: 60px;
		text-decoration: none;
	}
	span {
		font-size: 20px;
		margin-left: 15px;
		font-family: "PingFang SC", "Hiragino Sans GB", Arial, Verdana, Tahoma, "微软雅黑" !important;
		letter-spacing: 5px;
		color: white;
		line-height: 60px;
		font-style: italic;
	}
	h1{
		margin-left: 50px;
		float: left;
	}
	h1:after{
		content: '';
		clear: both;
	}
</style>