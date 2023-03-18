import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import piniaStore from "@/store";
import { router } from "@/router";

const VueApp = createApp(App);

VueApp.use(piniaStore);
VueApp.use(router);

VueApp.mount("#app");
