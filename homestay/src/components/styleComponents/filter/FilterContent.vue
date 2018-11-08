<template>
	<div class="filtercontent">
      <FilterRadio v-for="item in radiolist" :key="item.index" :radioli="item" :p="item.p" :info="info"/>
      <FilterPrice :p="price" :info="info"/>
	</div>
</template>

<script>
import FilterRadio from "./FilterRaduo";
import FilterPrice from "./FilterPrice";
export default {
  name: "FilterContent",
  components: {
    FilterRadio,
    FilterPrice
  },
  data() {
    return {
      radiolist: [
        {
          p: "area",
          name: "推荐",
          choose: [
            "全部",
            "武侯区",
            "成华区",
            "锦江区",
            "金牛区",
            "青羊区",
            "高新区",
            "天府新区"
          ]
        },
        {
          p: "type",
          name: "户型",
          choose: [
            "全部",
            "单间",
            "标间",
            "双人间",
            "套一",
            "套二",
            "套三",
            "别墅"
          ]
        }
      ],
      info: {
        area: "",
        type: "",
        price: [0,1000],
      },
      price: "price"
    };
  },
  watch: {
    info: {
      //深度监听，可监听到对象、数组的变化
      handler(val) {
        console.dir(val);
        this.axios.post("http://xiaoyu:81/index/style/search",
          this.qs.stringify({
            style: this.$route.query.style||"",
            data:val
          })
        ).then(re => {
          let data={};
          data["houselist"]=re.data.data;
          data["count"]=re.data.count;
          this.$emit("toParent",data);
        })
        .catch(err => {
          console.log(err);
        });
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>