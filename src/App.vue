<template>
	<div id="app">
		<Appheader></Appheader>
		<Inspec></Inspec>
		<!--<Tech></Tech>-->
		<!--<router-view/>-->
	</div>
</template>

<script>
	import Header from './components/Header'
	import Inspec from './pages/Inspection'
	import Technical from './pages/Technical'
	export default {
		name: 'App',
		components: {
			'Appheader': Header,
			'Inspec':Inspec,
			'Tech':Technical
		}
	}
</script>
<style>
 
  *{
  	margin: 0px;
    padding: 0px;
  }
    body{
    	background-color:#f5f9fb;
    	background:url(assets/imgs/back.png) no-repeat;
    	background-size: 100%;
    	
    }
	#app {
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;*/
	}
</style>