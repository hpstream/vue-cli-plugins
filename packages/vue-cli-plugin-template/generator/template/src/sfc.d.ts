declare module "*.vue" {
	import Vue from "vue";

	export default Vue;
}

declare interface Window {
	mm: any;
	share: any;
	wx: any;
	getWeixinSign: any;
	apiTimes: any;
	LMP: any;
	MConfirm: any;
}

declare module "vconsole";
declare module "*.png";
declare module "*.tsx";