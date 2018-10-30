<template>
	<div class="rea">
		<span>{{title}}</span>
		<ul>
			<li v-for="item in list">
				<router-link :to="item.href">
					{{item.title}}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'NavItemHelper',
		props:[],
		data(){
			return{
				title:'帮助中心',
				list:[
					{
						href:'#',
						title:'房源审核规范'
					},
					{
						href:'#',
						title:'房源安心计划'
					},
					{
						href:'#',
						title:'房源优质住宿计划'
					},
					{
						href:'#',
						title:'房客帮助'
					}
				]
			}
		}
	}
</script>

<style scoped>
	div,a {
		position: relative;
		display: inline-block;
		margin-left:10px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		color: white;
		height: 40px;
	}
	.rea:hover ul{
		display: block;
	}
	ul {
		display: none;
		position: absolute;
		background-color: white;
		list-style: none;
		color: black;
		left: -20px;
		top:40px;
		width: 140px;
		border-radius: 5px;
		padding: 10px 5px;
	}
	li {
		width: 140px;
		text-align: left;padding: 5px 5px 0px;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
	}
	li>a{
		color: black;
		line-height: 30px;
		height: 30px;
	}
	.rea {
		position: relative;
	}
</style>