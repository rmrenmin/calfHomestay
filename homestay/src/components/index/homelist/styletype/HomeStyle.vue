<template>
<div class="homestyle"> 
    <HomeLi v-for="item in homelist" :key="item.index" :homeli="item"/>
</div>
</template>

<script>
import HomeLi from './HomeLi';
	export default {
		name: 'HomeStyle',
		props:['homelist'],
		data() {
			return {
			
			}
		},
		components:{
			HomeLi,
		}
	}
</script>

<style scoped>
.homestyle {
	display: flex;
	flex-wrap: wrap;
}
</style>