<template>
<div class="title"> 
    <img :src="titlesrc" alt="">
	<h1>{{title}}</h1>
	<span>{{desc}}</span>
</div>
</template>

<script>
import titlesrc from "@/assets/indeximg/title.png";
export default {
  name: "Styletitle",
  props:['title','desc'],
  data() {
    return {
      titlesrc
    };
  }
};
</script>

<style scoped>
.title {
  width: 100%;
  height: 60px;
  position: relative;
}
img {
  width: 55px;
  height: 55px;
  position: absolute;
  top: 3px;
  left: 0px;
}
h1 {
  position: absolute;
  top: 0px;
  left: 80px;
  font-size: 28px;
}
span {
  position: absolute;
  bottom: 0px;
  left: 80px;
  font-size: 14px;
  color: #767676;
}
</style>