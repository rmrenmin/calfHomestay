<template>
	<div class="block">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in arrimg" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import img0 from '../../assets/indeximg/index-top0.jpg'
import img1 from '../../assets/indeximg/index-top1.jpg'
import img2 from '../../assets/indeximg/index-top2.jpg'
import img3 from '../../assets/indeximg/index-top3.jpg'
import img4 from '../../assets/indeximg/index-top4.jpg'
	export default {
		name: 'Carousel',
		data() {
			return {
                arrimg:[img0,img1,img2,img3,img4]
			}
		},
	}
</script>

<style scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  img {
      position: relative;
      right: 300px;
      top: -20px;
  }

</style>