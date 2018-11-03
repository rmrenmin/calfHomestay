<template>
	<div>
		<h2>房源管理</h2>
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
	import Leasing from './house/Leasing';//已租出
	import Lease from './house/Lease';//未租出
	import Leased from './house/Leased';//已下架
	import Add from './house/Add';//添加房源
	
	let tabs = [
				{component:Leasing,title:'已经租出'},
				{component:Lease,title:'尚未租出'},
				{component:Leased,title:'已经下架'},
				{component:Add,title:'添加房源'},
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