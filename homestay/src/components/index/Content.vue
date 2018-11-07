<template>
	<div class="index-content">
        <Search />
		<router-view/>
    </div>
</template>

<script>Homelist
import Search from './Search';
import Homelist from './HomeList'
	export default {
		name: 'Content',
		data() {
			return {
            
			}
		},
		components:{
			Search,
			Homelist,
		}
	}
</script>

<style scoped>
.index-content {
    width: 1050px;
    margin: 0 auto;
	background-color:white;
}
</style>