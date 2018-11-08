<template>
	<div class="content-box" type="flex">
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="title" v-model="title" placeholder="请输入房源标题">
					<template slot="prepend">标题</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="price" v-model="price" placeholder="请输入价格">
					<template slot="prepend">价格</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="block">
					<div class="el-input el-input-group el-input-group--prepend">
						<div class="el-input-group__prepend">开始日期</div>
						<el-date-picker v-model="start" align="center" type="date" placeholder="选择开始日期">
						</el-date-picker>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="block">
					<div class="el-input el-input-group el-input-group--prepend">
						<div class="el-input-group__prepend">结束日期</div>
						<el-date-picker v-model="end" align="center" type="date" placeholder="选择结束日期">
						</el-date-picker>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend type">主题</div>
					<div class="el-input__inner">
						<el-radio v-model="type" label="单间">单间</el-radio>
						<el-radio v-model="type" label="标间">标间</el-radio>
						<!--<el-radio v-model="type" label="双人间">双人间</el-radio>-->
						<el-radio v-model="type" label="套一">套一</el-radio>
						<el-radio v-model="type" label="套二">套二</el-radio>
						<el-radio v-model="type" label="套三">套三</el-radio>
						<el-radio v-model="type" label="别墅">别墅</el-radio>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend type">户型</div>
					<div class="el-input__inner">
						<el-checkbox-group v-model="checkList">
							<el-checkbox label="民居"></el-checkbox>
							<el-checkbox label="客栈"></el-checkbox>
							<el-checkbox label="别墅"></el-checkbox>
							<el-checkbox label="公寓"></el-checkbox>
							<el-checkbox label="海景房"></el-checkbox>
							<el-checkbox label="老洋房"></el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend typeadd">位置</div>
					<!--<div class="el-input__inner">-->
					<el-select v-model="selectValue" placeholder="请选择" size="medium" class="el-input__inner pa">
						<el-option v-for="(item,index) in choose" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
					<!--</div>-->
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend typeadd">详细地址</div>
					<el-input type="textarea" :rows="2" placeholder="请输入详细地址" v-model="detail" class="el-select el-input__inner pa el-select--medium">
					</el-input>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend typeadd">描述</div>
					<el-input type="textarea" :rows="2" placeholder="请输入描述内容" v-model="textarea" class="el-select el-input__inner pa el-select--medium">
					</el-input>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend typeadd">上传图片</div>
					<el-upload class="el-select el-input__inner pa el-select--medium" :show-file-list="false" action="http://localhost:81/upload" multiple :on-success="upsuccess" name="images">
						<div class="el-upload__text">点击上传 <i class="el-icon-success" v-if="isshow" style="color: green;"></i></div>
					</el-upload>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="14" :offset="1">
				<el-input id="captcha" v-model="captcha" placeholder="请输入验证码">
					<template slot="prepend">验证码</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<img :src="src" @click="changeClick" />
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-button id="content-btn" v-on:click="addhouse" style="width:100%" type="primary">添加</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	//	import Location from '../../../styleComponents/filter/FilterRaduo';
	export default {
		name: 'Add',
		data() {
			return {
				checkList: ['客栈'],
				captcha: null,
				imgSrcList:[],
				title: null,
				price: null,
				start:null,
				end:null,
				type: '标间',
				selectValue:null,
				textarea:null,
				src: 'http://localhost:81/captcha',
				isshow:false,
				choose: [
					"武侯区",
					"成华区",
					"锦江区",
					"金牛区",
					"青羊区",
					"高新区",
					"天府新区"
				],
				fileList: null,
				detail:null

			}
		},
		components: {
			//			Location,
		},
		methods: {
			addhouse(e) {
				let data = {
					style: this.checkList.join(';'),
					captcha: this.captcha,
					imgSrcList: JSON.stringify(this.imgSrcList),
					location: this.selectValue,
					title: this.title,
					price: this.price,
					start: this.start,
					end: this.end,
					type: this.type,
					textarea: this.textarea,
					username:this.$store.state.user.username,
					detail:this.detail
				};
				//输入验证
				//价格必须为number
				if(isNaN(this.price)){
					this.tip('价格必须为数字')
					return
				}
				//租期验证
				if((new Date(this.end)-new Date(this.start))<=0){
					this.tip('开始日期必须小于结束日期')
					return
				}
				//其他验证
				for(let item in data){
					if(!data[item]||data[item]=='[]'){
						this.tip('有未填项')
						return
					}
				}
				this.axios.post('http://localhost:81/info/add', this.qs.stringify(data)).then(res => {
					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://localhost:81/captcha?t=' + new Date();
					} else { //上传成功
//						console.log(this.imgSrcList)
						this.tip('添加成功！','success')
					}
				}).catch(err => {
					this.src = 'http://localhost:81/captcha?t=' + new Date();
					console.log(err)
				})
			},
			changeClick(e) {
				this.src = 'http://localhost:81/captcha?t=' + new Date();
			},

			upsuccess(res, file, fileList) {
				this.imgSrcList.push(res.data[0])
				this.isshow = true;
			},
			tip(m="消息",type="error"){
				this.message({
					type:type,
					center:true,
					message:this.$createElement('p',{style:'z-index:9999;'},m)
				})
			}
			
		},

	}
</script>
</script>

<style>
	.content-box {
		position: relative;
		/*left: calc(50% - 200px);*/
		/*top: calc(50% - 400px);*/
		padding: 20px 0px;
		width: 100%;
		/*border: 1px solid black;*/
		/*border-radius: 10px;*/
		/*box-shadow: 5px 5px 4px #e3e3e3;*/
		/*box-shadow: 4px 4px 4px 2px rgba(136, 136, 136, 0.5), -4px -4px 4px 2px rgba(136, 136, 136, 0.5);*/
	}
	
	.content-row {
		height: 50px;
	}
	
	.content-box img {
		width: 80px;
		height: 36px;
	}
	
	.el-date-editor {
		width: 100% !important;
	}
	
	.typeadd {
		height: 40px;
	}
	
	[disabled="disabled"] {
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #c0c4cc;
		cursor: not-allowed;
	}
	
	input[readonly="readonly"] {
		border: none !important;
		outline: none !important;
	}
	
	.pa {
		padding: 0px;
	}
	textarea{
		border: none !important;
	}
</style>