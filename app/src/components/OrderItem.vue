<template>
	<grid :show-lr-borders="false">
		<grid-item :label="name" :title="name"></grid-item>
		<grid-item :label="number"></grid-item>
		<grid-item :label="price"></grid-item>
		<grid-item :label="dateDiff"></grid-item>
		<grid-item v-if="status" @click.native="cancel">
			<span slot="label" class="cancle">取消</span>
		</grid-item>
	</grid>
</template>

<script>
	import { Grid, GridItem } from 'vux'
	export default {
		name: 'OrderItem',
		props: ['name', 'number', 'price', 'dateDiff', 'status', 'id', 'text'],
		data() {
			return {

			}
		},
		methods: {
			cancel(e) {
				let data = {
					status: 3,
					id: this.id
				}
				this.axios.post('http://xiaoyu:81/info/orderstatus', this.qs.stringify(data)).then(res => {
					console.log(res.data)
					this.order()
				}).catch(err => {
					console.log(err)
				})
			},
			order() {
				if(this.text == "已预约") {
					status = 1
				} else if(this.text == "已完成") {
					status = 2
				} else {
					status = 3
				}
				let data = {
					username: localStorage.getItem('username'),
					status: status,
					mobile: true
				}
				this.axios.post('http://xiaoyu:81/info/order', this.qs.stringify(data)).then(res => {
					console.log(res.data.data)
					console.log(this.$parent.$data)
					this.$emit('change-date', res.data.data)
					this.$vux.alert.show({
						title: '信息',
						content: '取消成功！'
					});
				}).catch(err => {
					console.log(err)
				})
			},
		},
		components: {
			Grid,
			GridItem
		}
	}
</script>

<style scoped>
	.cancle {
		width: 40px;
		height: 20px;
		border: 1px solid black;
		border-radius: 5px;
		display: block !important;
		cursor: pointer;
	}
	
	.cancle:hover {
		background-color: cadetblue;
	}
</style>