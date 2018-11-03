<template>
<div class="homeli"> 
    <div class="imgli" @click="routerTo">
        <img :src="homeli.src" alt="">
        <p>{{homeli.typename}}</p>
    </div>
</div>
</template>

<script>
export default {
  name: "HomeLi",
  props: ["homeli"],
  data() {
    return {
    };
  },
  methods: {
    routerTo() {
      this.$router.push({ path: "/style", query: { style: this.homeli.typename } });
    }
  }
};
</script>

<style scoped>
.homeli {
  margin: 12px;
}
.imgli {
  width: 500px;
  height: 280px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
img {
  width: 500px;
  height: 280px;
  border-radius: 12px;
}
img:hover {
  animation: img-change 1.5s;
}
@keyframes img-change {
  0% {
    transform: scale(1);
    filter: blur(0px);
  }
  60% {
    transform: scale(1.04);
    filter: blur(1.5px);
  }
  100% {
    transform: scale(1);
    filter: blur(0px);
  }
}

p {
  width: 200px;
  height: 60px;
  background-color: rgba(200, 200, 200, 0.5);
  line-height: 60px;
  font-size: 34px;
  font-weight: 600;
  color: white;
  text-align: center;
  letter-spacing: 6px;
  position: absolute;
  left: 150px;
  bottom: 110px;
  border-radius: 15px;
}
</style>