import "vuex";

declare module "vue/types/vue" {
	// 3. 声明为 Vue 补充的东西

	interface Vue {
		$confirm: any;
		$picker: any;
		$toast: any;
		$tracker: any;
		$formatScore: any;
	}
}
