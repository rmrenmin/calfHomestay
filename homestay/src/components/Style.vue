<template>
	<div class="style">
    <StyleFilter class="one" @toParent="searchData" />
		<StyleContent :houselist="houselist" class="two" @showParent="showData" :count="count"/>
		<StyleAside class="three"/>
	</div>
</template>

<script>
import StyleFilter from "./styleComponents/StyleFilter";
import StyleAside from "./styleComponents/StyleAside";
import StyleContent from "./styleComponents/StyleContent";
export default {
  name: "Style",
  data() {
    return {
      houselist: [],
      count: 6
    };
  },
  components: {
    StyleFilter,
    StyleAside,
    StyleContent
  },
  created() {
    if (!this.$route.query.style) {
      let data = this.qs.stringify(this.$route.query);
      this.axios.post("http://xiaoyu:81/index/search", data).then(res => {
        this.houselist = res.data.data;
        this.count = res.data.count;
      });
    } else {
      this.axios
        .post(
          "http://xiaoyu:81/index/style",
          this.qs.stringify({ style: this.$route.query.style })
        )
        .then(res => {
          this.houselist = res.data.data;
          this.count = res.data.count;
          console.log("count====" + JSON.stringify(this.count));
        });
    }
  },
  methods: {
    showData(data) {
      this.houselist = data;
    },
    searchData(data) {
      this.houselist = data.houselist;
      this.count = data.count;
    }
  }
};
</script>

<style scoped>
.style {
  width: 100%;
  position: relative;
  min-height: 800px;
}
.one {
  position: absolute;
  top: 0px;
}
.two {
  position: absolute;
  top: 200px;
  left: 30px;
}
.three {
  position: absolute;
  top: 200px;
  right: 30px;
}
</style>