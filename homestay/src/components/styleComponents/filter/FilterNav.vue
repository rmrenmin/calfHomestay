<template>
	<div class="filternav">
		<router-link to="/" class="toindex">首页</router-link>
		<span>>{{style}}</span>
	</div>
</template>

<script>
export default {
  name: "FilterNav",
  components: {},
  data() {
    return {
			style:"",
	}
  },
  created() {
	  this.style=this.$route.query.style;
  },
};
</script>

<style scoped>
.filternav {
	width: 100%;
	height: 40px;
	line-height: 50px;
	border-bottom: 2px solid #eee;
	text-align: left;
}
.toindex {
	color: #333;
	text-decoration: none;
}
</style>