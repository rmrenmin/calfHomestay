<template>
	<el-row id="info">
		<el-col :span="3" :offset="1" class="view mypadding">
			<el-row class="row-n">
					<info-nav :href="account">账户管理</info-nav>
			</el-row>
			<el-row class="row-n">
					<info-nav :href="order">预约管理</info-nav>
			</el-row>
			<el-row class="row-n">
					<info-nav :href="house">房源管理</info-nav>
			</el-row>
		</el-col>
		<el-col :span="18" :offset="1" class="view">
			<router-view></router-view>
		</el-col>
	</el-row>

</template>

<script>
	import InfoNav from './infonav/InfoNav'
	export default {
		name: 'Info',
		data() {
			return {
				account: 'account',
				order: 'order',
				house: 'house',
			}
		},
		components: {
			InfoNav,
		},
		beforeCreate: function() {
			if(!this.$store.state.user.state) {
				console.log('未登录!')
				this.$router.replace('/login')
			}
		}
	}
</script>

<style scoped>
	.view {
		border-radius: 20px;
		box-shadow: 3px 3px 2px 4px rgba(150,150,150,0.5);
		height: 100%;
	}
	.mypadding{
		padding: 20px 0px;
	}
	.row-n{
		padding:10px 0px;
	}
	#info{
		text-align: center;
		min-height: 700px;
	}
</style>