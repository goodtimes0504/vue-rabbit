
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
  <RouterView />
  <LayoutFooter />
</template>

<style>
</style>