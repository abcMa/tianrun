<template>
	<div class="Header container-fluid">
		<div class="logo">
			<h2 class="row">
  	 	 	<div><p><img src="../assets/imgs/logo.png"></p></div>
  	 	 	<span style="font-size: 24px;">供应商评价</span>
  	 	 </h2>
			<ul style="display: flex;width: 100%;">
				<li class="col-md-4" v-bind:class="class1" @click="add1" style="flex:1;margin-right: -20px;">
					<router-link to="/">物资类供应商使用评价表</router-link>
				</li>
				<li class="col-md-4" style="flex:1;" v-bind:class="class2" @click="add2">
					<router-link to="/Tech">技术服务类供应商使用评价表</router-link>
				</li>
				<li class="col-md-4" v-bind:class="class3" @click="add3" style="flex:1;margin-left: -20px;">
					<router-link to="/Mate">运检类供应商使用评价表</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {
				class1: ["ac11"],
				class2: ['ac2'],
				class3: ['ac3']
			}
		},
		methods: {
			add1: function(index) {
				this.class1.pop();　
				this.class1.push('ac11');
				this.class2.pop();　
				this.class2.push('ac2');
				this.class3.pop();　
				this.class3.push('ac3');
			},
			add2: function(index) {
				this.class1.pop();　
				this.class1.push('ac1');
				this.class2.pop();　
				this.class2.push('ac22');
				this.class3.pop();　
				this.class3.push('ac3');
			},
			add3: function(index) {
				this.class1.pop();　
				this.class1.push('ac1');
				this.class2.pop();　
				this.class2.push('ac2');
				this.class3.pop();　
				this.class3.push('ac33');
			}
		}
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
	
	.Header a {
		display: block;
		color: #fff!important;
		text-decoration: none;
	}
	
	.logo {
		height: 220px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.logo h2 {
		height: 166px;
		line-height: 176px;
		width: 320px;
		letter-spacing: 2px;
		position: absolute;
		left: 50%;
		margin-left: -110px!important;
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
		float: left
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
	
	.Header ul {
		position: absolute;
		margin-top: 185px;
	}
	
	.Header ul li {
		height: 44px;
		line-height: 44px;
		text-align: center;
		margin-top: -10px;
		background-size: 100% 100%!important;
	}
	
	.Header a {
		width: 100%;
		height: 100%;
	}
	
	.Header .ac1 {
		background: url(../assets/imgs/11.png) no-repeat;
	}
	
	.Header .ac11 {
		background: url(../assets/imgs/li_bg1.png) no-repeat;
	}
	
	.Header .ac2 {
		background: url(../assets/imgs/li_bg2.png) no-repeat;
	}
	
	.Header .ac22 {
		background: url(../assets/imgs/22.png) no-repeat;
	}
	
	.Header .ac3 {
		background: url(../assets/imgs/li_bg3.png) no-repeat;
	}
	
	.Header .ac33 {
		background: url(../assets/imgs/33.png) no-repeat;
	}
	
	span {
		float: left;
		margin-top: 10px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 640px) {
		.Header {
			background-size: auto 100%;
		}
		.Header ul {
			position: absolute;
			margin-top: 195px;
		}
		
		.Header ul li {
			height: 34px;
			width: 33.33%;
			line-height: 34px;
			text-align: center;
			background-size: 100% 100%!important;
			margin-left: 0px!important;
			margin-right: 0px!important;
		}
		.Header a {
			font-size: 9px!important;
		}
		.logo h2 {
			height: 186px;
			line-height: 186px;
		}
	}
	@media only screen and (min-width: 100px) and (max-width: 400px) {
		
		.logo h2 {
			left: 0;
			margin-left: 0px!important;
		}
		.logo h2 div{
			margin-left: 50px;
		}
	}
</style>