<template>
	<router-link :to="href">
		<i :style="{backgroundImage:'url('+ src +')',backgroundPosition: position}" v-if="isTrue"></i>
		<span>
			{{title}}
		</span>
	</router-link>
</template>

<script>
	export default{
		name:'NavItem',
		props:['href','title','src','isTrue','position'],
		data(){
			return{
				myStyle:{
					
				}
			}
		}
	}
	
</script>

<style scoped>
	a {
		display: inline-block;
		line-height: 60px;
		margin-left:10px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		margin-left:20px !important;
		color: white;
	}
	a:after{
		content: '';
		clear: both;
	}
	i {
		display: inline-block;
		width: 18px;
		height: 20px;
		vertical-align: middle;
		margin-right: 1px;
	}
</style>