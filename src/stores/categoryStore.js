import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { getCategoryApi } from "@/apis/layout"
export const useCategoryStore = defineStore("category", () => {
  //导航列表的数据管理
  //定义存储分类数据的响应式变量
  const categoryList = ref([])
  //定义获取分类数据函数
  const getCategory = async () => {
    const res = await getCategoryApi()

    categoryList.value = res.result
  }
  return { categoryList, getCategory }
})
