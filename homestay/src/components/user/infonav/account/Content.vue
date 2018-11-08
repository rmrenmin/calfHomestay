<template>
	<div class="content-box" type="flex">
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="username" v-model="username" placeholder="请输入帐号" disabled="disabled">
					<template slot="prepend">帐号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="nickname" v-model="nickname" placeholder="请输入昵称" :disabled="isable">
					<template slot="prepend">昵称</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="tel" v-model="tel" placeholder="手机号" :disabled="isable">
					<template slot="prepend">手机号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="block">
					<div class="el-input el-input-group el-input-group--prepend">
						<div class="el-input-group__prepend">出生日期</div>
						<el-date-picker v-model="birthday" align="center" type="date" placeholder="选择日期"  :disabled="isable">
						</el-date-picker>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<div class="el-input el-input-group el-input-group--prepend">
					<div class="el-input-group__prepend sex">性别</div>
					<div class="el-input__inner" :disabled="isable">
						<el-radio v-model="sex" label="男" :disabled="isable">男</el-radio>
	  					<el-radio v-model="sex" label="女" :disabled="isable">女</el-radio>
					</div>	
				</div>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="password" v-model="password" type="password" placeholder="请输入原密码" :disabled="isable">
					<template slot="prepend">原密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" :gutter="10" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="newpassword" v-model="newPassword" type="password" placeholder="请输入新密码"  :disabled="isable">
					<template slot="prepend">新密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" :gutter="10" class="content-row">
			<el-col :span="22" :offset="1">
				<el-input id="renewpassword" v-model="reNewPassword" type="password" placeholder="请再次输入新密码"  :disabled="isable">
					<template slot="prepend">验证密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row"  v-if="!isable">
			<el-col :span="14" :offset="1">
				<el-input id="captcha" v-model="captcha" placeholder="请输入验证码"  :disabled="isable">
					<template slot="prepend">验证码</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<img :src="src" @click="changeClick" />
			</el-col>
		</el-row>
		<el-row justify="center" class="content-row">
			<el-col :span="22" :offset="1">
				<el-button id="content-btn" v-on:click="modify" style="width:100%" type="primary">{{btn}}</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		name:'Content',
		data() {
			return {
				captcha: '',
				username: this.$store.state.user.username,
				nickname: this.$store.state.user.nickname,
				password: '',
				newPassword:'',
				reNewPassword: '',
				tel: this.$store.state.user.tel,
				src: 'http://xiaoyu:81/captcha',
				//日期相关
				birthday: this.$store.state.user.birthday,
				sex:this.$store.state.user.sex,
				isable:true,
				btn:'修改'
			}
		},
		methods: {
			modify(e) {
				this.btn = this.isable?"保存":"修改";
				this.isable = !this.isable;
				if(!this.isable)return;
				if(this.newPassword !== this.reNewPassword) {
					console.log('修改失败')
					return
				}
				let data = {
					username: this.username,
					nickname: this.nickname,
					password: this.password,
					newPassword: this.newPassword,
					birthday: this.birthday,
					sex: this.sex,
					tel: this.tel,
					captcha: this.captcha,
				};
				this.axios.post('http://xiaoyu:81/user/update', this.qs.stringify(data)).then(res => {
					console.log(res.data)
					if(res.data.status === 'error') {
						this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
					} else { //修改成功，修改state和localStorage
						this.$store.commit('login', data);
						for(let item in this.$store.state.user){
							localStorage.setItem(item,this.$store.state[item])
						}
					}
				}).catch(err => {
					this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
					console.log(err)
				})
			},
			changeClick(e) {
				this.src = 'http://xiaoyu:81/captcha?t=' + new Date();
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
	.sex {
		height: 40px;
	}
	[disabled="disabled"]{
		background-color: #f5f7fa;
    	border-color: #e4e7ed;
    	color: #c0c4cc;
    	cursor: not-allowed;
	}
</style>