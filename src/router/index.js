import { createRouter, createWebHistory } from "vue-router"
//createRouter:创建路由实例
//createWebHistory:创建history模式的路由实例
//引入login组件
import Login from "@/views/Login/index.vue"
//引入layout组件
import Layout from "@/views/Layout/index.vue"
//引入Home组件
import Home from "@/views/Home/index.vue"
//引入Category组件
import Category from "@/views/Category/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/layout",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "/category",
          name: "category",
          component: Category,
        },
      ],
    },
    {
      path: "/",
      name: "login",
      component: Login,
    },
  ],
})

export default router
