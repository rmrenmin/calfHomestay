<template>
	<div class="homepage">
		<el-pagination layout="prev, pager, next" :total="count" :page-size="pageSize" :current-page.sync="currPage">
		</el-pagination>
	</div>
</template>

<script>
export default {
  name: "HomePage",
  props: ["count"],
  data() {
    return {
      pageSize: 6,
      currPage: 1
    };
  },
  watch: {
    currPage(val) {
	  console.log("page====="+val);
      this.$router.push({
        path: "/style",
        query: { style: this.$route.query.style, page: val }
      });
      this.axios.post("http://xiaoyu:81/index/page",
          this.qs.stringify({
            style: this.$route.query.style,
            currPage: val,
            pageSize: this.pageSize
          })
        )
        .then(re => {
          this.data = re.data.data;
          this.$emit("showParent", this.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>