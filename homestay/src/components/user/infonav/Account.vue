<template>
	<div>
		<h2>账户管理</h2>
		<el-row class="mybox">
			<el-col :span='4' :offset="1" id='img-header'>
				<UploadHeader />
			</el-col>
			<el-col :span='17' :offset="1" class="content">
				<hr />
				<div id="des">
					<Content />
				</div>
			</el-col>
		</el-row>
	</div>
	
</template>

<script>
	import UploadHeader from './account/UploadHeader'
	import Content from './account/Content'
	export default{
		name:'Account',
		data(){
			return{

			}
		},
		components:{
			UploadHeader,
			Content
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	div{
		padding-top:20px;
	}
	img{
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
	#img-header{
		padding-top: 40px;
	}
	.mybox{
		padding-top: 20px;
		min-height: 600px;
	}
	#des {
		border-radius: 10px;
		width: 100%;
	}
	.content{
		padding:0px 10px;
	}
</style>