<template>
	<div @click="tapClick">
		<group-title>{{item.title}}</group-title>
		<swiper :list="item.imglist" show-dots></swiper>
	</div>
</template>

<script>
	import { GroupTitle } from 'vux'
	import { Swiper } from 'vux'
	export default{
		name:'HouseItem',
		props:['item'],
		components:{
			GroupTitle,
			Swiper
		},
		methods:{
			tapClick(e){
				console.log('houseitem===',this.item)
				this.$router.push({name:'Details',params:{data:this.item}})
			}
		}
	}
</script>

<style>
</style>