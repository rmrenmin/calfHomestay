<template>
	<div id="app">
		<router-view></router-view>
		<tabbar @on-index-change="value=$event" style="position:fixed;">
			<tabbar-item selected link="/" @on-item-click="itemClick">
				<img slot="icon" src="./assets/house.jpg">
				<span slot="label">房源</span>
			</tabbar-item>
			<tabbar-item link="/order" @on-item-click="itemClick">
				<img slot="icon" src="./assets/order.png">
				<span slot="label">订单</span>
			</tabbar-item>
			<tabbar-item link="/info" @on-item-click="itemClick">
				<img slot="icon" src="./assets/my.png">
				<span slot="label">我的</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				value:null,//当前选中tabitem索引
			}
		},
		methods:{
			itemClick(e){
				console.log(this.value)
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #fbf9fe;
	}
</style>