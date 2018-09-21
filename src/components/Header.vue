<template>
	<div class="Header container-fluid">
		<div class="logo">
			<h2 class="row">
  	 	 	<div><p><img src="../assets/imgs/logo.png"></p></div><span style="font-size: 24px;">供应商评价</span>
  	 	 </h2>
			<ul class="row">
				<li class="col-md-4">
					<router-link to="/">物资类供应商使用评价表</router-link>
				</li>
				<li class="col-md-4">
					<router-link to="/Tech">技术服务类供应商使用评价表</router-link>
				</li>
				<li class="col-md-4">
					<router-link to="/Mate">运检类供应商使用评价表</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	ul {
		list-style-type: none;
	}
	
	.Header {
		height: 220px;
		width: 100%;
		background: url(../assets/imgs/bg1.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
		
	}
	.Header a{
		color: #fff!important;
		text-decoration: none;
	}
	.logo {
		height: 220px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.logo h2 {
		height: 176px;
		line-height: 176px;
		width: 320px;
		letter-spacing: 2px;
		position: relative;
		left: 50%;
		margin-left: -130px;
	}
	
	.logo span {
		display: inline-block;
		margin-left: 0px;
	}
	
	.logo div {
		position: relative;
		background: rgba(255, 255, 255, 0.20);
		border: 10px solid rgba(255, 255, 255, 0.30);
		width: 72px;
		height: 72px;
		border-radius: 100%;
		display: inline-block;
		overflow: hidden;
		margin-top: 60px;
		margin-right: 20px;
	}
	
	.logo p {
		background: rgba(255, 255, 255, 0.8);
		position: absolute;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	
	.logo img {
		position: absolute;
		left: 0px;
		width: 100%;
		height: auto;
	}
	
	.Header ul li {
		height: 44px;
		line-height: 44px;
		text-align: center;
		background-size: 100% 100%!important;
	}
	
	.Header ul li:first-child {
		background: url(../assets/imgs/li_bg1.png) no-repeat;
	}
	
	.Header ul li:nth-child(2) {
		background: url(../assets/imgs/li_bg2.png) no-repeat;
	}
	
	.Header ul li:nth-child(3) {
		background: url(../assets/imgs/li_bg3.png) no-repeat;
	}
	
	span {
		float: right;
		margin-right: 50px;
		margin-top: 10px;
	}
</style>