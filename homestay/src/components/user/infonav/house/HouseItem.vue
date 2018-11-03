<template>
	<el-row class="box">
		<el-row class="box">
			<el-col :span="8" class="s">
				<span>日期：{{new Date(time).toLocaleDateString()}}</span>
			</el-col>
			<el-col :span="8" :offset="1" class="s">
				<span>房源编号：{{h_id}}</span>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3" class="cell flexbox">
				<span :class="[mystyle]" :style="'background-image:url('+imglist+')'"></span>
			</el-col>
			<el-col :span="7" class="cell flexbox">
				<span>{{title}}：</span>
				<span :title="description">{{description}}</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>{{location}}</span>
			</el-col>
			<el-col :span="3" class="cell flexbox">
				<span>{{$store.state.user.nickname}}</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>{{price}}</span>
			</el-col>
			<el-col :span="3" class="cell flexbox">
				<span v-if="status==1">空闲</span>
				<span v-else-if="status==2">已租出</span>
				<span v-else>下架</span>
			</el-col>
			<el-col :span="2" class="cell flexbox">
				<span>{{type}}</span>
			</el-col>
			<el-col :span="2" class="flexbox">
				<span class="btn active" @click="delClick" v-if="status==1">下架</span>
				<span v-else-if="status==2">{{theme}}</span>
				<span v-else>{{theme}}</span>
			</el-col>
		</el-row>
	</el-row>
</template>

<script>
	export default {
		name: 'HouseItem',
		props: ['time', 'number', 'type', 'title', 'price', 'status', 'description', 'location', 'imglist', 'h_id','theme'],
		data() {
			return {
				mystyle: 'mystyle',
				//				delOrder:'true'  通过v-if会将组件设为隐藏之后的分页会没有内容
			}
		},
		methods: {
			delClick(e) {
				this.myMthod('确认下架房源？',3)
			},
			myMthod(meaasge, status) {
			if(confirm(meaasge)) {
				this.axios.post('http://localhost:81/info/housestatus', this.qs.stringify({
					status: status,
					id: this.h_id
				})).then((res) => {
					//						this.delOrder = !this.delOrder;
					//方法劫持调用父的watch内的方法
					this.$parent._watchers["0"].cb.call(this.$parent, 'children')
					console.log(res.data)
				}).catch((err) => {
					alert('操作失败！')
					console.log(err)
				})
			}
		}
		},
		watch: {

		},
		
	}
</script>

<style scoped>
	.box {
		border: 1px solid #e3e3e3;
		padding: 0px !important;
		margin: -1px -1px 0px;
		color: black;
		background-color: white;
	}
	
	.cell {
		border-right: 1px solid #e5e5e5;
		height: 100%;
		font-size: 14px;
		font-weight: 400;
	}
	
	.merge {
		padding-right: 1px;
		margin-right: -1px;
	}
	
	.btn {
		display: inline-block;
		border-radius: 10px;
		width: 40px;
		height: 20px;
		border: 1px solid #DDDDDD;
		background-color: #f5f5f5;
		cursor: pointer;
	}
	
	.flexbox {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.active:hover {
		background-color: #3A8EE6;
	}
	
	.s {
		height: 30px;
		line-height: 30px;
		text-align: left;
	}
	
	.mystyle {
		height: 70px;
		width: 70px;
		background-position: center;
		background-size: 70px 70px;
		background-repeat: no-repeat;
	}
</style>