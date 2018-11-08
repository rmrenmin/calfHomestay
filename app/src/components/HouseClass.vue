<template>
	<div>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<Search @value-change="value=$event"></Search>
		<view-box class="box" v-for="item in search">
			<HouseItem :item="item"></HouseItem>
		</view-box>
	</div>

</template>

<script>
	import Search from './Search'
	import { GroupTitle } from 'vux'
	import { Swiper } from 'vux'
	import HouseDefault from '../assets/home/house_default_list_img.png'
	import HouseItem from './HouseItem'

	const defaultImg = [HouseDefault, HouseDefault];
	let imglist = defaultImg.map(val => {
		return {
			url: '',
			img: '',
			fallbackImg: HouseDefault,
			title: ''
		}
	})
	export default {
		name: 'HouseClass',
		data() {
			return {
				title: this.$route.query.typename,
				typename: this.$route.query.typename,
				value: ['全部','全部'],
				search: [{
					title: '客栈',
					imglist: imglist
				}]
			}
		},
		created() {
			let data = {
				style: this.typename,
				data: {
					area: this.value[0] == '全部' ? '' : this.value[0],
					type: this.value[1] == '全部' ? '' : this.value[1],
					price: [0, 1000]
				},
			}
			this.axios.post('http://localhost:81/index/style/search', this.qs.stringify(data)).then(res => {
				this.search = res.data.data.map(val => {
					return {
						val:val,
						title: val.title,
						imglist: JSON.parse(val.imglist).map(re => {
							return {
								url: '',
								img: re,
								fallbackImg: HouseDefault,
								title: '￥' + val.price
							}
						})
					}
				})
				console.log('res', res.data.data)
				console.log('search', this.search)

			}).catch(err => {
				console.log(err)
			})
		},
		watch: {
			value(val) {
				let data = {
					style: this.typename,
					data: {
						area: val[0] == '全部' ? '' : val[0],
						type: val[1] == '全部' ? '' : val[1],
						price: [0, 1000]
					},
				}
				this.axios.post('http://localhost:81/index/style/search', this.qs.stringify(data)).then(res => {
					this.search = res.data.data.map(val => {
						return {
							val:val,
							title: val.title,
							imglist: JSON.parse(val.imglist).map(re => {
								return {
									url: '',
									img: re,
									fallbackImg: HouseDefault,
									title: '￥' + val.price
								}
							})
						}
					})
					console.log('res', res.data.data)
					console.log('search', this.search)

				}).catch(err => {
					console.log(err)
				})
			}
		},
		components: {
			Search,
			GroupTitle,
			Swiper,
			HouseItem
		}
	}
</script>

<style scoped>
	div {
		height: 100%;
	}
	
	.box {
		border-radius: 5px;
		padding: 0px 10px;
	}
</style>