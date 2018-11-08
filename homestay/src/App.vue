<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="nav">
					<Nav/>
				</div>
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
		background-color: rgb(50,44,39);
		color: #333;
		text-align: center;
		line-height: 60px;
		padding: 0px;
		z-index: 999;
		
	}
	
	
	.el-main {
		/*background-color: #E9EEF3;*/
		color: #333;
		/*text-align: center;*/
		/*line-height: 160px;*/
		min-height: 650px;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.nav{
		position: fixed;
		width: 100%;
		line-height: 60px;
		background-color: rgb(50,44,39);
	}
</style>