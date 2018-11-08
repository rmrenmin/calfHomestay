<template>
	<div class="home" @click="routerTo">
		<img :src="src" />
		<p>{{typename}}</p>
	</div>
</template>

<script>
	export default {
		name: 'TypeStyle',
		props:['src','typename'],
		methods:{
			routerTo(e){
				this.$router.push({path:'/houseclass',query:{typename:this.typename}})
			}
		}
	}
</script>

<style scoped>
	.home{
		position: relative;
		/*width: 100%;*/
		/*height: 50%;*/
		border-radius: 10px;
	}
	.home>img{
		width: 100%;
		height: 50%;
		border-radius: 10px;
	}
	.home>p{
		position: absolute;
		width: 100px;
		height: 30px;
		font-size: 20px;
		line-height: 30px;
		right: calc(50% - 50px);
		top: calc(50% - 15px);
		text-align: center;
		z-index: 999;
		background-color:  rgba(200, 200, 200, 0.5);
		color: black;
		border-radius: 5px;
	}
</style>