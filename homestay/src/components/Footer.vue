<template>
  <div id="footer">
    <ul class='f-list'>
      <li>
		  <h3>联系我们</h3>
		  <ul class="connection">
			  <li>
				  <p>服务热线</p>
				  <h3>800-820-8820</h3>
			  </li>
			  <li>
				  <p>客户服务</p>
				  <ul class="qqemail">
					  <li>QQ:1373976797</li><br>
					  <li>Email:service@xiaoniu.com</li>
				  </ul>
			  </li>
			  <li>
				  <p>商务合作</p>
				  <ul class="qqemail">
					  <li>QQ:133445566</li><br>
					  <li>Email:service@xn.com</li>
				  </ul>
			  </li>
			  
		  </ul>
	  </li>
	   <li>
		  <h3>公司信息</h3>
		  <ul>
			  <li><a href="javascript:void(0);" target="_blank">关于小牛</a></li>
			  <li><a href="javascript:void(0);" target="_blank">加入我们</a></li>
			  <li><a href="javascript:void(0);" target="_blank">战略合作</a></li>
			  <li><a href="javascript:void(0);" target="_blank">媒体报道</a></li>
			  <li><a href="javascript:void(0);" target="_blank">业主招募</a></li>
			  <li><a href="javascript:void(0);" target="_blank">隐私政策</a></li>
			  <li><a href="javascript:void(0);" target="_blank">免责声明</a></li>
		  </ul>
	  </li>
      <li>
		  <h3>帮助中心</h3>
		  <ul>
			  <li><a href="javascript:void(0);" target="_blank">房源审核规范</a></li>
			  <li><a href="javascript:void(0);" target="_blank">房客安心计划</a></li>
			  <li><a href="javascript:void(0);" target="_blank">优质住宿计划</a></li>
			  <li><a href="javascript:void(0);" target="_blank">网站地图</a></li>
			  <li><a href="javascript:void(0);" target="_blank">房客帮助</a></li>
		  </ul>
	  </li>
     
      <li>
		  <h3>热门住宿</h3>
        <ul> 
          <li><a href="javascript:void(0);" target="_blank">民宿</a></li>
          <li><a href="javascript:void(0);" target="_blank">家庭旅游</a></li>
          <li><a href="javascript:void(0);" target="_blank">朋友聚会</a></li>
          <li><a href="javascript:void(0);" target="_blank">商务出差</a></li>
          <li><a href="javascript:void(0);" target="_blank">日租</a></li>
          <li><a href="javascript:void(0);" target="_blank">别墅</a></li>
      </ul>
      </li>
    </ul>
	<el-breadcrumb separator="|" class="f-bottom">
		<el-breadcrumb-item>服务热线：800-820-8820</el-breadcrumb-item>
		<el-breadcrumb-item>商务合作</el-breadcrumb-item>
		<el-breadcrumb-item>优质住宿计划</el-breadcrumb-item>
		<el-breadcrumb-item>房客帮助</el-breadcrumb-item>
		<el-breadcrumb-item>加入我们</el-breadcrumb-item>
		<el-breadcrumb-item>关于小牛</el-breadcrumb-item>
		<el-breadcrumb-item>隐私政策</el-breadcrumb-item>
		<el-breadcrumb-item>用户答疑</el-breadcrumb-item>
		<el-breadcrumb-item>公司信息</el-breadcrumb-item>
		<el-breadcrumb-item>战略合作</el-breadcrumb-item>
		<el-breadcrumb-item>网站备案</el-breadcrumb-item>
		<el-breadcrumb-item>许可证号：</el-breadcrumb-item>
		<el-breadcrumb-item>营业执照编号：</el-breadcrumb-item>
	</el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
li {
	list-style: none;
}
#footer {
  width: 100%;
  height: 400px;
  background-color: rgb(50, 44, 39);
}
.f-list {
  color: white;
  display: flex;
  justify-content: space-around;
}
.f-list > li {
  text-align: left;
  margin: 10px;
  font-size: 16px;
}
.f-list ul li {
	height: 30px;
	line-height: 30px;
}
.connection li {
	display: inline;
}
.qqemail {
	font-size: 14px;
}
li>a {
	color: white;
	text-decoration: none;
}
li>a:hover {
	color: rgb(150,150,150);
	text-decoration: underline;
}
.f-bottom {
	width: 600px;
	margin: 20px auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.f-bottom span {
	color: rgb(150,150,150) !important;
	margin: 2px;
}

</style>