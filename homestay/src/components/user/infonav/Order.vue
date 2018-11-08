<template>
	<div>
		<h2>预约管理</h2>
		<el-row class="mybox">
			<el-col :span="3" :offset="1" class="view mypadding">
				<el-row class="row-n" v-for="(item,i) in tabs" :key="i">
					<ItemNav :index="i" @change-tab="current=tabs[$event]">{{item.title}}</ItemNav>
				</el-row>
			</el-col>
			<el-col :span='18' :offset="1" class="content view">
				<hr />
				<div id="des">
					<component :is="current.component"></component>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import ItemNav from './ItemNav';
	import History from './order/History';
	import Cancel from './order/Cancel';
	import Ordering from './order/Ordering';
	
	let tabs = [
				{component:Ordering,title:'已预约'},
				{component:Cancel,title:'已取消'},
				{component:History,title:'已完成'}
			]
	export default {
		name: 'House',
		data(){
			return{
				tabs,
				current:tabs[0],
			}
		},
		components:{
			ItemNav,
		},
		methods:{
		},
		beforeCreate: function() {

		}
	}
</script>

<style scoped>
	div {
		padding-top: 20px;
	}
		
	.mybox{
		padding-top: 20px;
		min-height: 600px;
	}
	#des {
		width: 100%;
	}
	.content{
		padding:0px 10px;
	}
	.view {
		border-radius: 20px;
		/*box-shadow: 3px 3px 2px 4px rgba(150,150,150,0.5);*/
		min-height: 500px;
	}
	.mypadding{
		padding: 20px 0px;
	}
	.row-n{
		padding:10px 0px;
	}
</style>