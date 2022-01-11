<!--suppress ALL -->
<template>
	<div class="main" id="root"></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component({
		components: {},
	})
	export default class Index extends Vue {}
</script>

<style lang="scss">
	@import "../../styles/common";

	body {
		transition: 0.5s;
	}
</style>
