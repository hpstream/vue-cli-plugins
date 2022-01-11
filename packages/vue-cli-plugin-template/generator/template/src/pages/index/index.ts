import Vue from "vue";

import "@/styles/reset.scss";
import App from "<%= entryFileName %>";

// Vue.use(vueErrorPlugin);

new App().$mount("#root");
