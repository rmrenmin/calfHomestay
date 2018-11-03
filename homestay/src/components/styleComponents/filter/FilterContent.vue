<template>
	<div class="filtercontent">
      <FilterRadio v-for="item in radiolist" :key="item.index" :radioli="item" />
      <FilterPrice />
	</div>
</template>

<script>
import FilterRadio from "./FilterRaduo";
import FilterPrice from "./FilterPrice";
export default {
  name: "FilterContent",
  data() {
    return {
      radiolist: [
        {
          name: "推荐",
          choose: [
			      "全部",
            "武侯区",
            "成华区",
            "锦江区",
            "金牛区",
            "青羊区",
            "高新区",
            "天府新区"
          ]
        },
        {
          name: "户型",
          choose: [
			      "全部",
            "单间",
            "标间",
            "双人间",
            "套一",
            "套二",
            "套三",
            "别墅"
          ]
        }
      ]
    };
  },
  components: {
    FilterRadio,
    FilterPrice,
  }
};
</script>

<style scoped>
</style>