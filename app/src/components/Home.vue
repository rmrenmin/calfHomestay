<template>
	<div>
		<x-header :left-options="{backText:'返回'}" :title="title"></x-header>
		<view-box v-for="item in styletype">
			<divider>{{item.title}}</divider>
			<flexbox justify="center" wrap="wrap">
				<flexbox-item :span="1/3" v-for="val in item.homelist">
					<TypeStyle :src="val.src" :typename="val.typename"></TypeStyle>
				</flexbox-item>
			</flexbox>
		</view-box>
	</div>
</template>

<script>
	import Houses from '@/assets/home/houses.jpg';
	import Inn from '@/assets/home/inn.jpg';
	import Villa from '@/assets/home/Villa.jpg';
	import Apartment from '@/assets/home/apartment.jpg';
	import Family from '@/assets/home/family.jpg';
	import Business from '@/assets/home/business.jpg';
	import Party from '@/assets/home/party.jpg';
	import WeekMonth from '@/assets/home/weekmonth.jpg';
	import TypeStyle from './TypeStyle';
	export default {
		name: 'Home',
		data() {
			return {
				title: '小牛短租',
				styletype: [{
						title: "旅行就要住民宿",
						homelist: [{
								typename: "民居",
								src: Houses
							},
							{
								typename: "客栈",
								src: Inn
							},
							{
								typename: "别墅",
								src: Villa
							},
							{
								typename: "公寓",
								src: Apartment
							},
						]
					},
					{
						title: "旅行主题",
						homelist: [{
								typename: "家庭出游",
								src: Family
							},
							{
								typename: "商旅出差",
								src: Business
							},
							{
								typename: "聚会轰趴",
								src: Party
							},
							{
								typename: "周租月租",
								src: WeekMonth
							},
						]
					}
				]
			}
		},
		components:{
			TypeStyle,
		}
	}
</script>

<style>

</style>