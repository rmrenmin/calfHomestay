<template>
	<div>
		<el-row class="bgt">
			<el-col :span="10" class="cell flexbox">
				<span>房源</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>位置</span>
			</el-col>
			<el-col :span="3" class="cell flexbox">
				<span>房主名称</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>价格</span>
			</el-col>
			<el-col :span="3" class="cell flexbox">
				<span>房源状态</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>类型</span>
			</el-col>
			<el-col :span="2" class="flexbox">
				<span>操作</span>
			</el-col>
		</el-row>
		<HouseItem v-for="(item,index) in data" :key="index" v-bind="item"></HouseItem>
		<div class="block">
			<el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" v-bind:current-page.sync="currPage">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import HouseItem from './HouseItem';
	export default {
		name: 'Leasing',
		data() {
			return {
				pageSize:4,
				total:20,
				currPage:1,
				status:1,
				data: [
//					{
//						date: '2018-11-1',
//						number: '20111111111',
//						user: 'test',
//						price: '400.00',
//						complete: '正在进行',
//						name: '小牛民宿',
//						dateDiff: '20',
//						url: 'http://localhost:81/upload/1.jpg'
//					},
				]
			}
		},
		components: {
			HouseItem,
		},
		watch:{
			currPage:function(val){
				console.log('监听')
				console.log(val)
				console.log(this)
				//val为当前页面
				//根据currentPage变化获取当前页的显示内容
				//发送axios根据currPage和pageSize、username获取数据
				this.axios.post('http://localhost:81/info/house',this.qs.stringify({
					'currPage':this.currPage,
					'pageSize':this.pageSize,
					'username':this.$store.state.user.username,
					'status':this.status
				})).then((re)=>{
					this.data = re.data.data;
					this.total = re.data.count
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		created:function(){
			console.log(this.currPage)
			this.axios.post('http://localhost:81/info/house',this.qs.stringify({
					'currPage':this.currPage,
					'pageSize':this.pageSize,
					'username':this.$store.state.user.username,
					'status':this.status
			})).then((re)=>{
				console.log(re.data.data)
				this.data = re.data.data;
				this.total = re.data.count
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.bgt{
		border: 1px solid #e3e3e3;
		padding: 0px !important;
		margin: -1px -1px 0px;
		color: black;
		background-color: #909399;
	}
	
	.merge {
		padding-right: 1px;
		margin-right: -1px;
	}
	.block{
		padding-top: 20px;
	}
	.cell{
		border-right: 1px solid #e5e5e5;
		/*border-left: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;*/
		height: 100%;
		font-size: 14px;
		font-weight: 400;
	}
	.btn{
		display: inline-block;
		border-radius: 10px;
		width: 40px;
		height: 20px;
		border: 1px solid #DDDDDD;
		background-color: #f5f5f5;
		cursor: pointer;
	}
	.flexbox{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.s{
		height: 30px;
		line-height: 30px;
		text-align: left;
	}
	.mystyle{
		height: 70px;
		width: 70px;
		background-position: center;
		background-size: 70px 70px;
		background-repeat: no-repeat;
	}
</style>