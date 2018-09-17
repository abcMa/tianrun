<template>
	<div id="app">
		<Appheader></Appheader>
		<Inspec></Inspec>
		<router-view/>
	</div>
</template>

<script>
	import Header from './components/Header'
	import Inspec from './pages/Inspection'
	export default {
		name: 'App',
		components: {
			'Appheader': Header,
			'Inspec':Inspec
		}
	}
</script>
<style>
 
  *{
  	margin: 0px;
    padding: 0px;
  }
    body{
    	background:#fafdff;
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