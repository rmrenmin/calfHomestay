<template>
	<div class="style">
    	<StyleFilter class="one"/>
		<StyleContent :houselist="houselist" class="two" />
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
		houselist:[]
	};
  },
  components: {
    StyleFilter,
    StyleAside,
    StyleContent
  },
  beforeCreate() {
	  this.styletype = this.$route.query.style;

    let obj = { style: this.styletype };
    let data = this.qs.stringify(obj);
    this.axios.post("http://localhost:81/index/style", data).then(res => {
	  this.houselist=res.data.results;
	  console.log("style===="+JSON.stringify(this.houselist));
    });
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
  left: 0px;
}
.three {
  position: absolute;
  top: 200px;
  right: 0px;
}
</style>