<template>
<div class="block"> 
	<div class="search-box">
		<div class="search-filter">
			<ul class="input-list">
					<Select :info="info" :p="area.p" :name="area.name" :option="area.option" class="area"/> <span class="between">|</span>
					<Daterange :info="info" :p="daterange.p" class="daterange" /> <span class="between">|</span>
          <Select :info="info" :p="people.p" :name="people.name" :option="people.option" class="people"/>
			</ul>
		</div>
    <el-button type="button" round class="search-btn" @getinfo="searchinfo" @click="searchHouse">搜索民宿</el-button>
	</div>
</div>
</template>

<script>
import Select from "./search/Select";
import Daterange from "./search/Daterange";
export default {
  name: "Search",
  data() {
    return {
      info:{
        area:'',
        daterange:[],
        number:''
      },
      area: {
        p:"area",
        name: "城区",
        option: [
          "武侯区",
          "成华区",
          "锦江区",
          "金牛区",
          "青羊区",
          "高新区",
          "天府新区",
          "新都区",
          "郫都区",
          "温江区",
          "双流区",
          "龙泉驿区",
          "青白江区"
        ]
      },
      people: {
        p:"number",
        name: "入住人数",
        option: ["1人", "2人", "3人", "4人", "5人", "6人", "7人", "8人", "不限"]
      },
      daterange:{
        p:"daterange",
      }
    };
  },
  methods:{
    searchinfo(info){
      this.info=info;
      console.log("111"+this.info);
    },
    searchHouse(){
      console.log(this.info);
      let data=this.qs.stringify(this.info);
      this.axios.post('http://localhost:81/index/search',data)
      .then(res => {
        console.log(res.data);
      })
    }
  },
  components: {
    Select,
    Daterange
  }
};
</script>

<style scoped>
.block {
  width: 100%;
  height: 130px;
  border-bottom: 2px solid #eee;
  position: relative;
}
.search-box {
  width: 100%;
  position: absolute;
  top: 40px;
  line-height: 50px;
}
.search-filter {
  width: 70%;
  height: 60px;
  position: absolute;
  left: 76px;
}
.search-btn {
  background-color: #21c48e;
  position: absolute;
  right: 76px;
  font-size: 22px;
  color: white;
}
.input-list {
  display: flex;
  justify-content: center;
}

.between {
  margin: 0 20px;
}
.area,
.daterange,
.people {
  height: 45px;
}
</style>