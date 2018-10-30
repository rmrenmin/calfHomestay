<template>
	<div>
		<Carousel />
		<Content />
	</div>
</template>

<script>
import Carousel from './index/Carousel';
import Content from './index/Content';
	export default {
		name: 'Index',
		components:{
			Carousel,
			Content
		},
		data() {
			return {

			}
		},
	}
</script>

<style>
	
</style>