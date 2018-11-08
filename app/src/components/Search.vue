<template>
	<div class="ps">
		<x-button :text="text" @click.native="filter"></x-button>
		<Picker :data="list" v-model="value" class="ps" v-show="isShow"></Picker>
	</div>
	
</template>

<script>
	import { Picker } from 'vux'
	export default {
		name: 'Search',
		data() {
			return {
				value:["全部","全部"],
				list:[
					["全部","武侯区","成华区","锦江区","金牛区","青羊区","高新区","天府新区"],
					["全部","单间","标间","双人间","套一","套二","套三","别墅"]
				],
				isShow:false,
				text:'筛选'
			}
		},
		components: {
			Picker,
		},
		methods:{
			filter(e){
				this.isShow = !this.isShow;
				if(this.isShow){
					this.text = '确定'
				}else{
					this.text = '筛选'
				}
			}
		},
		watch:{
			value(val){
				this.$emit('value-change',val)
			}
		}
	}
</script>

<style scoped>
	.ps{
		position: relative;
		width:100%;
	}
</style>