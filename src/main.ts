import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import piniaStore from "@/store";
import { router } from "@/router";
import { registerSW } from "virtual:pwa-register";

const VueApp = createApp(App);

VueApp.use(piniaStore);
VueApp.use(router);

VueApp.mount("#app");

registerSW({
  immediate: true,
  // onNeedRefresh() {},
  // onOfflineReady() {},
});
