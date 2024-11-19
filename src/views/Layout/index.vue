
<script setup>
import { onMounted } from "vue"
import LayoutNav from "../Layout/components/LayoutNav.vue"
import LayoutHeader from "../Layout/components/LayoutHeader.vue"
import LayoutFooter from "../Layout/components/LayoutFooter.vue"
//引入吸顶导航功能
import LayoutFixed from "../Layout/components/LayoutFixed.vue"

//触发获取导航列表的action
import { useCategoryStore } from "@/stores/category"
const categoryStore = useCategoryStore()
onMounted(() => {
  return categoryStore.getCategory()
})
</script>
<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 给二级路由出口添加一个独一无二的key就可以让他在参数变化的时候不走缓存 解决组件复用导致的缓存bug（复用的时候生命周期钩子函数不执行 导致 路由参数变化之后 组件内容没更新） 添加key之后破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
</template>

<style>
</style>