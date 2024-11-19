
<script setup>
import LayoutNav from "../Layout/components/LayoutNav.vue"
import LayoutHeader from "../Layout/components/LayoutHeader.vue"
import LayoutFooter from "../Layout/components/LayoutFooter.vue"
//引入吸顶导航功能
import LayoutFixed from "../Layout/components/LayoutFixed.vue"
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