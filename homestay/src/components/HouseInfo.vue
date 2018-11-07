<template>
	<div class="houseinfo">
		<div class="content">
			<router-link to="/" class="toindex">首页</router-link>
		        <span>>{{style}}</span>
			<span>>{{id}}</span>
			<h1>{{styleaddress}}</h1>
			<h6>{{address}}</h6>
			<div class="img">
				<img :src="img1" />
			</div>
			<div class="scorll">
				<li><img :src="imgsrc4"/></li>
				<li><img :src="imgsrc1"/></li>
				<li><img :src="imgsrc2"/></li>
				<li><img :src="imgsrc1"/></li>
				<li><img :src="imgsrc3"/></li>
				<li><img :src="imgsrc4"/></li>
			</div>
			<div class="arcside">
				<!--需要定位的图片-->
				<img :src="arcside"/>
				<img :src="map"/>
			</div>
			<div class="infor">
				<li><img :src="infor"/></li>
				<li><img :src="count"/></li>
				<li><img :src="xy"/></li>
			</div>
			<div class="intor1">
	     			<img :src="intor" />
	     		</div>
	     		<div class="intor">
	     			<img :src="jiben" />
	     		</div>
			<div class="intor2">
				<img :src="pei" />
			</div>
			<div class="intor">
				<img :src="pinglun" />
			</div>
		</div>
		<div class="intor other">
			<img :src="other" />
		</div>
	</div>
</template>

<script>
import img1 from "@/assets/houseinfo/img1.jpg";
import imgsrc1 from "@/assets/houseinfo/1.png";
import imgsrc2 from "@/assets/houseinfo/2.png";
import imgsrc3 from "@/assets/houseinfo/3.png";
import imgsrc4 from "@/assets/houseinfo/4.png";
import arcside from "@/assets/houseinfo/arcside.png";
import map from "@/assets/houseinfo/map.png";
import infor from "@/assets/houseinfo/infor.png";
import count from "@/assets/houseinfo/count.png";
import xy from "@/assets/houseinfo/xy.png";
import jiben from "@/assets/houseinfo/jiben.png";
import pei from "@/assets/houseinfo/pei.png";
import pinglun from "@/assets/houseinfo/pinglun.png";
import other from "@/assets/houseinfo/other.png";
export default {
  name: "HouseInfo",
  data() {
    return {
      style: "",
      id: "房间编号： ",
      styleaddress: "日系简约风  锦里   宽窄巷子   春熙路",
      address: "成都羊青年冠寓（天府广场店） ",
      img1,imgsrc1,imgsrc2,imgsrc3,imgsrc4,arcside,map,infor,count,xy,jiben,pei,pinglun,other,
    };
  },
  created() {
    this.style = this.$route.query.style;
    this.id += this.$route.query.h_id;
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.toindex {
	color: #333;
	text-decoration: none;
}
.content {
  width: 92%;
  height: 1550px;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-left: 4%;
}
.title {
  height: 120px;
  width: 100%;
  margin-top: 0%;
}
.img {
  height: 480px;
  width: 770px;

  float: left;
}
.img img {
  height: 480px;
  width: 786px;
}
.scorll {
  height: 480px;
  width: 100px;
  position: relative;
  margin-left: 15px;
  float: left;
}
.arcside {
  float: right;
  width: 310px;
  height: 554px;
}
.infor {
  height: 90px;
  width: 770px;
  border-bottom: 1px solid darkgrey;
  position: relative;
  margin-top: 497px;
}
.infor li {
  float: left;
  width: 33%;
  height: 90px;
}
.scorll li {
  height: 68px;
  width: 80px;
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
}
.scorll li img {
  height: 68px;
  width: 80px;
}
.intor {
  height: 120px;
  width: 800px;
  border-bottom: 1px solid darkgrey;
}
.intor2 {
  height: 180px;
  width: 800px;
  border-bottom: 1px solid darkgrey;
}	     	
.other {
	height: 300px;
}
</style>