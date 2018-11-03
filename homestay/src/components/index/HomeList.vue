<template>
<div class="block"> 
	<StyleType v-for="item in styletype" :key="item.index" :styletype="item"/>
</div>
</template>

<script>
import Houses from '@/assets/indeximg/houses.jpg';
import Inn from '@/assets/indeximg/inn.jpg';
import Villa from '@/assets/indeximg/Villa.jpg';
import Apartment from '@/assets/indeximg/apartment.jpg';
import Family from '@/assets/indeximg/family.jpg';
import Business from '@/assets/indeximg/business.jpg';
import Party from '@/assets/indeximg/party.jpg';
import WeekMonth from '@/assets/indeximg/weekmonth.jpg';

import StyleType from "./homelist/StyleType";
export default {
  name: "HomeList",
  data() {
    return {
      styletype: [
        {
          title: "旅行就要住民宿",
          desc: "谈笑有鸿儒，往来无白丁",
		  homelist: [
			  { typename: "民居", src: Houses },
			  { typename: "客栈", src: Inn },
			  { typename: "别墅", src: Villa },
			  { typename: "公寓", src: Apartment },
		  ]
        },
        {
          title: "旅行主题推荐",
          desc: "有一种旅行叫跋山涉水来睡你",
          homelist: [
			  { typename: "家庭出游", src: Family },
			  { typename: "商旅出差", src: Business },
			  { typename: "聚会轰趴", src: Party },
			  { typename: "周租月租", src: WeekMonth },
			  ]
        }
      ]
    };
  },
  components: {
    StyleType
  }
};
</script>

<style scoped>
</style>