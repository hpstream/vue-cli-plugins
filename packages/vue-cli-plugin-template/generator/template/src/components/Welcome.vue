<template>
	<div>
		<img src="https://cli.vuejs.org/favicon.png" class="logo" />
		<p class="title"><%= htmlWebpackPlugin.options.title %></p>
		<br />
		<br />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	export default {
		name: "WelcomeComponent",
		methods: {
			goto(url: string) {
				window.open(url);
			},
		},
	};
</script>

<style scoped lang="scss">
	.logo {
		display: block;
		width: 180px;
		margin: 160px auto 100px;
	}

	.title {
		font-size: 60px;
		color: #000000;
		text-align: center;
	}

	.content {
		@extend .title;
		text-align: left;
		font-size: 30px;
		padding: 0 40px;
	}

	span {
		color: #3eaf7c;
	}
</style>
