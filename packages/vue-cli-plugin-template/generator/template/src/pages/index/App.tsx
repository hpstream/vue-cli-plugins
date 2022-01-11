import { Component, Vue, Watch } from "vue-property-decorator";
import Welcome from "@/components/Welcome.vue";



@Component({
		components: {
      Welcome
		},
})
export default class MainPage extends Vue {
	render() {
		return (
			<div class="index-wrapper" id="root">
				<Welcome />
			</div>
		);
	}
}
