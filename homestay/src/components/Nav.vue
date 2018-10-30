<template>
	<div>
		<el-row class="">
			<el-col :span="12">
				<Logo />
			</el-col>
			<el-col :span="8" :offset="4">
				<NavItem v-for="item in data" :href="item.href" :src="item.src" :title="item.title" :position="item.position" :isTrue="item.isTrue" />
				<NavItemHelper />
				<NavLoginRegister />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Logo from './Logo';
	import NavItem from './navComponents/NavItem';
	import NavItemHelper from './navComponents/NavItemHelper';
	import NavLoginRegister from './navComponents/NavLoginRegister';
	import Icon from '../assets/icon.png';
	export default {
		name: 'Nav',
		data() {
			return {
				data:[
					{
						href:'/',
						src:Icon,
						title:'首页',
						isTrue:false,
						position:''
					},
					{
						href:'#',
						src:Icon,
						title:'客户热线',
						isTrue:true,
						position:'0px -76px'
					},
					{
						href:'#',
						src:Icon,
						title:'商旅合作',
						isTrue:false,
						position:''
					},
				]

			};
		},
		methods: {
		},
		components:{
			Logo,
			NavItem,
			NavItemHelper,
			NavLoginRegister,
		}
	}
</script>

<style scoped>
	
</style>