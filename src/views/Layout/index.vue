
<script setup>
import LayoutNav from "../Layout/components/LayoutNav.vue"
import LayoutHeader from "../Layout/components/LayoutHeader.vue"
import LayoutFooter from "../Layout/components/LayoutFooter.vue"
</script>
<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <RouterView />
  <LayoutFooter />
</template>

<style>
</style>