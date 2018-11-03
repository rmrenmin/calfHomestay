<template>
	<div id="pic">
		<input type="file" name="file" id="file" @change="upload" hidden accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" ref='inp'/>
		<img :src="src" @click="imgClick" />
		<label for="file">修改头像</label>
	</div>
</template>
<script>
	export default {
		name: 'UploadHeader',
		data() {
			return {
				src: this.$store.state.user.imgSrc,
				uploadSrc: 'http://localhost:81/upload'
			};
		},
		methods: {
			upload(e) {
				let file = document.getElementById('file').files[0];
				if(file) {
					this.src = URL.createObjectURL(file);
					let xhr = new XMLHttpRequest();
					let formdata = new FormData();
					formdata.append('images', file);
					xhr.open('post', this.uploadSrc, true);
					xhr.onreadystatechange = () => {
						if(xhr.readyState === 4 && xhr.status === 200) {
							let res = JSON.parse(xhr.response);
							console.dir(res)
							if(res.status === 'success') {
								this.$store.commit('changeHeader', res.data[0])
							}

						}
					};
					xhr.send(formdata)
				}
			},
			imgClick(e){//单击头像换头像
				this.$refs.inp.click()
			}
		},
	}
</script>
<style scoped>
	#pic img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin: 5px;
		cursor: pointer;
	}
	
	#pic label {
		display: block;
		width: 80px;
		height: 20px;
		line-height: 20px;
		border: 1px solid black;
		border-radius: 4px;
		font-size: 15px;
		text-align: center;
		margin: 5px;
		cursor: pointer;
	}
	
	#pic label:hover {
		background-color: cadetblue;
	}
	
	#pic {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>