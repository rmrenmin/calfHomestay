<template>
	<div>
		<Carousel/>
		<Content class="content"/>
	</div>
</template>

<script>
import Carousel from './index/Carousel';
import Content from './index/Content';
	export default {
		name: 'Index',
		components:{
			Carousel,
			Content,
		},
		data() {
			return {

			}
		},
	}
</script>

<style scoped>
	.content {
		position:relative;
		top:-60px;
		z-index: 500;
	}

</style>