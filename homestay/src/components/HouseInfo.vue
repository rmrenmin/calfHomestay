<template>
	<div class="houseinfo">
		<div class="content">
			<router-link to="/" class="toindex">首页</router-link>
		        <span>>{{style}}</span>
			<span>>{{id}}</span>
			<h1>{{info.house.title}}</h1>
			<h6>{{ JSON.parse(info.house.location).city}}{{ JSON.parse(info.house.location).district}}{{ JSON.parse(info.house.location).detail}}</h6>
			<div class="block">
				<el-carousel height="490px">
					<el-carousel-item v-for="item in arrimg" :key="item.index">
						<img :src="item" alt="" class="carouselimg"/>
					</el-carousel-item>
				</el-carousel>
			</div>
			<img :src="homeinfo" alt="" srcset="">
			<img :src="pinlun" alt="" srcset="">
		</div>
		<div class="aside">
			<div class="price">
				<div class="priceN">
					<span>￥</span>
					{{info.house.price}}
					<span>/晚</span>
				</div>
				<div class="sale">满7天9.5折，满30天9.0折</div>
			</div>
			<div class="time">
				<span class="start">{{ start }}</span>
				至
				<span class="end">{{ end }}</span>
			</div>
			<div class="order" @click="orderhome">{{orderinfo}}</div>
			<p class="infotag">房东信息</p>
			<div class="userinfo">
				<img :src="info.user.imgsrc" alt="">
				<div class="info-right">
					<p>{{info.user.nickname}}</p>
					<img :src="connect" alt="" srcset="">
				</div>
			</div>
			
		</div>

		<img :src="other" alt="">
	</div>
</template>

<script>
import imgsrc1 from "@/assets/houseinfo/1.jpg";
import imgsrc2 from "@/assets/houseinfo/2.jpg";
import imgsrc3 from "@/assets/houseinfo/3.jpg";
import imgsrc4 from "@/assets/houseinfo/4.jpg";
import other from "@/assets/houseinfo/other.png";
import connect from "@/assets/houseinfo/connect.png";
import homeinfo from "@/assets/houseinfo/homeinfo.png";
import pinlun from "@/assets/houseinfo/pinlun.png";
export default {
  name: "HouseInfo",
  data() {
    return {
      style: "",
      id: "房间编号： 00",
      arrimg: [imgsrc1, imgsrc2, imgsrc3, imgsrc4],
      other,
      connect,
      homeinfo,
      pinlun,
      info: {},
      start: "",
      end: "",
			orderinfo: "立即预定",
			flag:true,
    };
  },
  created() {
    this.style = this.$route.query.style;
    this.id += this.$route.query.h_id;
    this.axios
      .post(
        "http://xiaoyu:81/index/house",
        this.qs.stringify({ h_id: this.$route.query.h_id })
      )
      .then(res => {
        console.log("====houseinfo====\n" + JSON.stringify(res.data));
        this.info = res.data;
        this.start = new Date(
          JSON.parse(this.info.house.period)[0]
        ).toLocaleDateString();
        this.end = new Date(
          JSON.parse(this.info.house.period)[1]
        ).toLocaleDateString();
      });
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  },
  methods: {
    menu() {
      let scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scroll > 1100) {
        document.querySelector(".aside").classList.add("aside-other");
      } else if(document.querySelector(".aside-other")){
        document.querySelector(".aside").classList.remove("aside-other");
      }
    },
    orderhome() {
      if (this.flag) {
        if (this.$store.state.user.username) {
					console.log(11);
          let data = {};
          data.price = this.info.house.price;
          data.period = this.info.house.period;
          data.h_id = this.$route.query.h_id;
          data.username = this.$store.state.user.username;
          data.u_id2 = this.info.user.u_id;
          this.axios
            .post("http://xiaoyu:81/index/order", this.qs.stringify(data))
            .then(res => {
              if (res.data.re == "ok") {
                this.orderinfo = "预定成功";
                document.querySelector(".order").classList.add("disabled");
                this.flag = false;
              }
            });
        } else {
          alert("请先登录");
        }
      }
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

h1 {
  margin: 8px 0;
  color: #313442;
  font-weight: 500;
}
h6 {
  line-height: 18px;
  font-size: 14px;
  color: #777776;
  width: 695px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
}
.toindex {
  color: #333;
  text-decoration: none;
}
.content {
  width: 92%;
  height: 1500px;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-left: 4%;
}

.block {
  width: 800px;
}
.carouselimg {
  height: 490px;
  width: 800px;
}
.aside {
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  position: fixed;
  right: 20px;
  top: 172px;
}
.aside-other {
  position: absolute !important;
  right: 20px;
  top: 172px;
}
.order {
  width: 100%;
  font-size: 20px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background: #ffa800;
  cursor: pointer;
}
.priceN {
  line-height: 50px;
}
.price {
  width: 100%;
  height: 90px;
  background: #eee;
  color: #ff5d51;
  font-size: 22px;
  border-bottom: 1px solid #ccc;
}
.price span {
  font-size: 16px;
}
.sale {
  font-size: 14px;
  color: black;
  position: absolute;
  top: 50px;
  text-indent: 4px;
}
.time {
  width: 90%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  margin: 16px auto;
  text-align: center;
}
.infotag {
  position: relative;
  left: 160px;
  margin: 10px;
  color: #2ebe6a;
}
.userinfo {
  width: 100%;
  height: 200px;
  border-top: 1px solid #ccc;
  margin-top: 10px;
  position: relative;
}
.userinfo > img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
}
.info-right {
  width: 250px;
  height: 100px;
  position: absolute;
  top: 20px;
  right: 40px;
}
.info-right p {
  font-size: 20px;
  line-height: 32px;
  color: #4d4844;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.info-right img {
  margin-left: 30px;
}
.disabled {
    /* pointer-events: none; */
    cursor: not-allowed;
    opacity: 0.6;
}
</style>