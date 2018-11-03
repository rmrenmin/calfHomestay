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
				<el-input type="textarea" :rows="2" placeholder="请输入描述内容"  v-model="textarea"> 
					<template slot="prepend">描述</template>
				</el-input>
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
				<el-button id="content-btn" v-on:click="modify" style="width:100%" type="primary">添加</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Add',
		data() {
			return {
				checkList:['客栈'],
				captcha: '',
				textarea:'',
				title: this.$store.state.user.title,
				price: this.$store.state.user.price,
				password: '',
				newPassword: '',
				reNewPassword: '',
				tel: this.$store.state.user.tel,
				src: 'http://localhost:81/captcha',
				//日期相关
				start: this.$store.state.user.start,
				end: this.$store.state.user.end,
				type: this.$store.state.user.type,
				isable: true,
			}
		},
		methods: {
			modify(e) {
				this.isable = !this.isable;
				if(!this.isable) return;
				if(this.newPassword !== this.reNewPassword) {
					console.log('修改失败')
					return
				}
				let data = {
					title: this.title,
					price: this.price,
					password: this.password,
					newPassword: this.newPassword,
					start: this.start,
					type: this.type,
					tel: this.tel,
					captcha: this.captcha,
				};
				this.axios.post('http://localhost:81/user/update', this.qs.stringify(data)).then(res => {
					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://localhost:81/captcha?t=' + new Date();
					} else { //修改成功，修改state和localStorage
						this.$store.commit('login', data);
						for(let item in this.$store.state.user) {
							localStorage.setItem(item, this.$store.state[item])
						}
					}
				}).catch(err => {
					this.src = 'http://localhost:81/captcha?t=' + new Date();
					console.log(err)
				})
			},
			changeClick(e) {
				this.src = 'http://localhost:81/captcha?t=' + new Date();
			}
		},

	}
</script>
</script>

<style scoped>
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
	
	.type {
		height: 40px;
	}
	
	[disabled="disabled"] {
		background-color: #f5f7fa;
		border-color: #e4e7ed;
		color: #c0c4cc;
		cursor: not-allowed;
	}
</style>