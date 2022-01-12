<!--suppress ALL -->
<template>
	<div class="main" id="root">
		<WelcomeComponent /> 
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import WelcomeComponent from "@/components/Welcome.vue"; // eslint-disable-line

	@Component({
		components: {
			WelcomeComponent
		},
	})
	export default class Index extends Vue {}
</script>

<style lang="scss">
	@import "../../styles/common";

	body {
		transition: 0.5s;
	}
</style>
