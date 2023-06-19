import { createApp } from "vue";
import App from "./App.vue";
//引入Antd组件库
import Antd from "ant-design-vue";
//引入Antd组件库CSS文件
import "ant-design-vue/dist/antd.css";

import { createRouter, createWebHashHistory } from "vue-router";
import home from "@/pages/home/index.vue";
import detail from "@/pages/detail/index.vue";

// 创建路由器实例并配置路由表
const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: home,
    },
    {
      path: "/detail",
      component: detail,
    },
  ],
});

const app = createApp(App);
app.config.productionTip = false;
app.use(router).use(Antd).mount("#app");
