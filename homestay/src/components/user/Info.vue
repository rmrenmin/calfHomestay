<template>
	<h1>个人信息中心</h1>
</template>

<script>
	//	import 
	import { Message } from 'element-ui';

	export default {
		name: 'Info',
		data() {
			return {

			}
		},
		components: {

		},
		beforeCreate: function() {
			console.log('log')
			Message('ssssssssssssssssss')
		}
	}
</script>

<style>

</style>