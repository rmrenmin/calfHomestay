<template>
	<div class="stylecontent">
		<div class="homelist">
			<HomeLi v-for="item in houselist" :key="item.index" :homeli="item"/>
		</div>
		<HomePage @showParent="toParent" :count="count" class="page" />
	</div>
</template>

<script>
import HomeLi from "./stylecontent/HomeLi";
import HomePage from "./stylecontent/HomePage";
export default {
  name: "StyleContent",
  props: ["houselist","count"],
  components: {
    HomeLi,
    HomePage,
  },
  data() {
    return {
	};
  },
  methods:{
	  toParent(data){
		  this.$emit("showParent",data);
	  }
  }
};
</script>

<style scoped>
.stylecontent {
  width: 960px;
  height: 600px;
  /* border: 1px solid pink; */
}
.homelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.page {
	text-align: center;
}
</style>