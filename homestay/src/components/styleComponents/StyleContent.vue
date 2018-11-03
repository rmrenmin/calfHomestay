<template>
	<div class="stylecontent">
		<div class="homelist">
		<HomeLi v-for="item in houselist" :key="item.index" :homeli="item"/>
		</div>
		<HomePage />
	</div>
</template>

<script>
import HomeLi from './stylecontent/HomeLi';
import HomePage from './stylecontent/HomePage';
	export default {
		name: 'StyleContent',
		props:['houselist'],
		components:{
			HomeLi,
			HomePage,
		},
		data() {
			return {

			}
		},
	}
</script>

<style scoped>
.stylecontent {
	width: 960px;
	height: 600px;
	border: 1px solid pink;
}
.homelist {
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
}

</style>