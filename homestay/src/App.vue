<template>
	<div id="app">
		<el-container>
			<el-header>
				<Nav/>
			</el-header>
			<el-main>
				<router-view/>
			</el-main>
			<el-footer>
				<Footer />
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import Nav from './components/Nav';
	import Footer from './components/Footer';
	export default {
		name: 'App',
		components: {
			Nav,
			Footer
		}
	}
</script>

<style>
* {
		margin: 0px;
		padding: 0px;
	}
	
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
		padding: 0px;
	}
	
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-container .el-aside {
		line-height: 320px;
	}
</style>