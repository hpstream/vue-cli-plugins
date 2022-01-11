<template>
	<div>
		<WelcomeComponent />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	// 这是个 demo 别忘了上线前删掉哦
	import WelcomeComponent from "@/components/Welcome.vue"; // eslint-disable-line

	export default Vue.extend({
		name: "MainPage",
		components: { WelcomeComponent },
	});
</script>

<style lang="scss">
	@import "../../styles/common";

	body {
		transition: 0.5s;
	}
</style>
