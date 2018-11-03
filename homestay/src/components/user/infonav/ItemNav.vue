<template>
	<el-button type="info" plain @click="change">
		<slot></slot>
	</el-button>
</template>

<script>
	export default{
		name:'ItemNav',
		props:['index'],
		data(){
			return{
				
			}
		},
		methods:{
			change(){
				this.$emit('change-tab',this.index)
			}
		}
	}
</script>

<style>
</style>