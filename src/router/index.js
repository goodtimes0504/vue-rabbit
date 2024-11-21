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
//引入二级分类组件
import SubCategory from "@/views/SubCategory/index.vue"
//导入商品详情组件
import Detail from "@/views/Detail/index.vue"
//导入购物车结算列表组件
import CartList from "@/views/CartList/index.vue"
//导入订单结算组件
import Checkout from "@/views/Checkout/index.vue"
//导入订单结算组件
import Pay from "@/views/Pay/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "category/:id?",
          name: "category",
          component: Category,
        },
        {
          path: "category/sub/:id?",
          name: "subCategory",
          component: SubCategory,
        },
        {
          path: "detail/:id?",
          name: "detail",
          component: Detail,
        },
        {
          path: "cartList",
          name: "cartList",
          component: CartList,
        },
        {
          path: "checkout",
          name: "checkout",
          component: Checkout,
        },
        {
          path: "pay",
          name: "pay",
          component: Pay,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
  ///路由跳转滚动条置顶
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
