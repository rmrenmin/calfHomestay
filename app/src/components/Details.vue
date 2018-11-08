<template>
	<view-box>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<div>
			<h3 style="text-align: center;">{{data.title}}</h3>
		</div>
		<swiper :list="data.imglist" show-dots></swiper>
		<div>
			<load-more tip="房源详情" :show-loading="false" background-color="#fbf9fe"></load-more>
			<x-table :cell-bordered="false" style="background-color:#fff;">
				<tbody>
					<tr>
						<td>标题</td>
						<td>{{data.val.title}}</td>
					</tr>
					<tr>
						<td>描述</td>
						<td>{{data.val.description}}</td>
					</tr>
					<tr>
						<td>地区</td>
						<td>{{location}}</td>
					</tr>
					<tr>
						<td>主题</td>
						<td>{{data.val.style}}</td>
					</tr>
					<tr>
						<td>类型</td>
						<td>{{data.val.type}}</td>
					</tr>
					<tr>
						<td>评分</td>
						<td>{{star}}</td>
					</tr>
				</tbody>
			</x-table>
		</div>
		<view-box>
			<group>
      			<calendar v-model="start" title="起租时间" show-popup-header popup-header-title="起租时间"></calendar>
    		</group>
    		<group>
      			<calendar v-model="end" title="结束时间" show-popup-header popup-header-title="结束时间"></calendar>
    		</group>
		</view-box>
		<div class="box">
			<x-button text='预约租房' @click.native="putOrder"></x-button>
		</div>
	</view-box>
</template>

<script>
	import { GroupTitle, Swiper,XTable,Calendar,LoadMore  } from 'vux'
	export default {
		name: 'Details',
		data() {
			return {
				title:'房源详情',
				data: null,
				start:'TODAY',
				end:'TODAY'
			}
		},
		created() {
			this.data = this.$route.params.data
			console.log('details', this.data)
		},
		computed:{
			location(){
				let d = JSON.parse(this.data.val.location)
				return `${d.city}-${d.district}-${d.detail}`
			},
			star(){
				let star = JSON.parse(this.data.val.star)
				return `总分:${star.total}  服务:${star.sever}`
			}
		},
		watch: {

		},
		components: {
			GroupTitle,
			Swiper,
			XTable,
			Calendar,
			LoadMore
		},
		methods:{
			putOrder(){
				if(!localStorage.getItem('username')){
					this.$vux.alert.show({
							title:'信息',
							content:'请先登录！'
					})
					return
				}
				if((new Date(this.end) - new Date(this.start))<=0){
					this.$vux.alert.show({
							title:'信息',
							content:'租期必须大于零！'
					})
					return 
				}
				let data = {
					...this.data.val,
					username:localStorage.getItem('username'),
					start:this.start,
					end:this.end
				}
				this.axios.post('http://xiaoyu:81/user/putorder',this.qs.stringify(data)).then(res=>{
					console.log(res.data)
					
					if(res.data.status=='success'){
						this.$vux.alert.show({
							title:'信息',
							content:'预约成功！'
						})
					}
				}).catch(err=>{
					console.log(err)
					this.$vux.alert.show({
						title:'信息',
						content:'预约失败！'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.box{
		margin-top: 20px;
	}
</style>