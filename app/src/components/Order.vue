<template>
	<view-box>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<view-box v-if="loginStatus">
			<x-button text="已预约" @click.native="order(1)"></x-button>
			<x-button text="已完成" @click.native="order(2)"></x-button>
			<x-button text="已取消" @click.native="order(3)"></x-button>
		</view-box>
		<view-box v-if="loginStatus">
			<group-title>{{text}}</group-title>
			<grid :show-lr-borders="false">
		    	<grid-item :label="v" v-for="(v,i) in ['描述','编号','价格','租期']" :key="i">
		    	</grid-item>
		    	<grid-item label="操作" v-if="status"></grid-item>
    		</grid>
    		<group v-for="(v,i) in data" :key="i">
			    <OrderItem v-bind="v" :status="status" :text="text" @change-date='data=$event'></OrderItem>
    		</group>
		</view-box>
	</view-box>
</template>

<script>
	import {GroupTitle,Grid,GridItem} from 'vux';
	import OrderItem from './OrderItem';
	export default{
		name:'Order',
		data(){
			return {
				title:'订单中心',
				loginStatus:localStorage.getItem('username')?true:false,
				text:'',
				data:[],
				status:false,
			}
		},
		components:{
			GroupTitle,
			Grid,
			GridItem,
			OrderItem
		},
		methods:{
			order(status){
				if(status=="1"){
					this.text="已预约"
					this.status = true
				}else if(status=="2"){
					this.text="已完成"
					this.status = false
				}else{
					this.text="已取消"
					this.status = false
				}
				let data = {
					username:localStorage.getItem('username'),
					status:status,
					mobile:true
				}
				this.axios.post('http://localhost:81/info/order',this.qs.stringify(data)).then(res=>{
					console.log(res.data.data)
					this.data = res.data.data
				}).catch(err=>{
					console.log(err)
				})
			},
			cancel(e){
				console.log(e)
			}
		},
		created(){
			if(!localStorage.getItem('username')){
				this.$vux.alert.show({
					title: '信息',
					content: '请先登录！'
				});
				this.$router.replace('/login')
			}
		}
	}
</script>

<style scoped>
	p{
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
</style>