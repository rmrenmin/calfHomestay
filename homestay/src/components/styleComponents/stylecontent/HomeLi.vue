<template>
	<div class="homeli" @click="routerTo">
        <div class="houseimg">
            <img src="" v-lazy="JSON.parse(homeli.imglist)[0]" alt="">
            <p class="price">￥{{homeli.price}}</p>
            <p class="title">{{homeli.title}}</p>
            <ul>
                <li><span class="coloro">{{  JSON.parse(homeli.star).total  }}分</span> </li>
                <li><span class="coloro">{{  tag  }}</span> </li>
                <li><span>{{homeli.number}}人评论过</span> </li>
                <li><span>{{homeli.type}}</span> </li>
                <li><span>可住{{peopleNumber}}</span> </li>
            </ul>
        </div>
	</div>
</template>

<script>
export default {
  name: "HomeLi",
  props: ["homeli"],
  data() {
    return {
      peopleNumber: "1人",
      tag: "GOOD!",
    };
  },
  created() {
    console.log("=========" + JSON.parse(this.homeli.imglist)[0]);
    this.calNumber();
    this.getTag();
  },
  methods: {
    routerTo() {
      this.$router.push({
        path: "/houseinfo",
        query: { h_id: this.homeli.h_id }
      });
    },
    calNumber() {
      let type = this.homeli.type;
      let types = ["单间", "标间", "双人间", "套一", "套二", "套三", "别墅"];
      for (let i = 0; i < types.length; i++) {
        if (types.indexOf(type) == 0) {
          this.peopleNumber = "2人";
        }
        if (types.indexOf(type) == 1) {
          this.peopleNumber = "2人";
        }
        if (types.indexOf(type) == 2) {
          this.peopleNumber = "2人";
        }
        if (types.indexOf(type) == 3) {
          this.peopleNumber = "2人";
        }
        if (types.indexOf(type) == 4) {
          this.peopleNumber = "4人";
        }
        if (types.indexOf(type) == 5) {
          this.peopleNumber = "6人";
        }
        if (types.indexOf(type) == 6) {
          this.peopleNumber = "6人以上";
        }
      }
    },
    getTag() {
      let temp = JSON.parse(this.homeli.star).total;
      if (temp >= 5) {
        this.tag = "完美！";
        return;
      }
      if (temp >= 4) {
        this.tag = "超赞！";
        return;
      } else {
        this.tag = "GOOD!";
        return;
      }
    },
  }
};
</script>

<style scoped>
.homeli {
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
}
img {
  width: 300px;
  height: 200px;
  border-radius: 6px;
  margin-bottom: 10px;
}
.title {
  font-size: 16px;
  color: #484848;
  font-weight: bold;
}
.title,
ul {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
}
.coloro {
  color: #fa8100;
}
li {
  list-style: none;
  float: left;
  margin-right: 10px;
  line-height: 22px;
}
span {
  font-size: 14px;
}
.price {
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    text-align: center;
    position: absolute;
    bottom: 70px;
    left: 0;
    font-size: 18px;
    color: #fff;
    background-color: rgba(50, 44, 39, 0.9);
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
}
</style>