<script setup>
//引入ref和onMounted
import { ref, onMounted } from "vue"
//引入封装好的获取二级分类列表数据的api
import { getCategoryFilterAPI } from "@/apis/category"
//引入获取二级分类的商品列表数据函数
import { getSubCategoryAPI } from "@/apis/category"
//引入获取路由参数的函数
import { useRoute } from "vue-router"
//引入封装好的GoodsItem组件 来实现商品的渲染
import GoodsItem from "@/views/Home/components/GoodsItem.vue"

//获取面包屑导航数据
const route = useRoute()
const categoryData = ref({})
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(() => {
  return getCategoryData()
})
//获取基础列表数据的渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  //不加await会报错
  //   console.log(res)
  //   console.log(res.result.items)
  //   console.log(res)
  goodList.value = res.result.items
}
onMounted(() => {
  return getGoodList()
})
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList" :key="good.id" :good="good" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>