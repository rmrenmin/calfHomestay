<template>
<div class="block">
    <p>价格</p>
    <el-slider class="slider"
      v-model="value"
      :max="1000"
      range
      :show-tooltip="false">
    </el-slider>
    <div class="pricerange">
        <span>￥{{value[0]}}</span>
        <span>-￥{{value[1]}}</span>
    </div>
    <span class="sureprice" @click="sureprice">确定</span>
</div>
</template>

<script>
export default {
  name: "FilterPrice",
  data() {
    return {
      value: [0, 1000]
    };
  },
  methods: {
    sureprice() {
      console.log(this.value);
    }
  }
};
</script>

<style scoped>
.block {
  position: relative;
  left: 30px;
  top: 18px;
}
p {
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  left: 20px;
}
.slider {
  width: 500px;
  position: absolute;
  left: 80px;
  top: -7px;
}
.pricerange {
  position: absolute;
  left: 620px;
}
span {
  font-size: 14px;
}
.sureprice {
    font-size: 14px;
    position: absolute;
    left: 750px;
    color:#409EFF;
}
</style>