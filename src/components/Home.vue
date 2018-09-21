<template>
	<div id="Home">
		<Appheader></Appheader>
		<!--<Inspec></Inspec>-->
		<!--<Tech></Tech>-->
		<router-view/>
	</div>
</template>

<script>
	import Header from './Header'
	export default {
		name: 'Home',
		components: {
			'Appheader': Header
		}
	}
</script>
<style>

</style>