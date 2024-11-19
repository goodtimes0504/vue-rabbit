//封装分类数据业务相关代码

// 引入获取二级分类的api
import { getCategoryAPI } from "@/apis/category"
//引入vue的ref和onMounted
import { ref, onMounted } from "vue"
//引入useRoute获取路由参数
import { useRoute } from "vue-router"
//引入路由导航守卫
import { onBeforeRouteUpdate } from "vue-router"
export function useCategory() {
  //获取路由参数
  const route = useRoute()
  //获取分类数据
  const categoryData = ref({})
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => {
    return getCategory()
  })
  //希望 路由参数变化的时候可以把分类数据接口重新发送 而轮播图数据用缓存即可
  onBeforeRouteUpdate((to) => {
    // console.log("路由变化了")
    //重新获取数据 但是存在问题因为最新的路由参数没有获取到 所以得用to参数
    // console.log(to)
    getCategory(to.params.id)
  })
  return {
    categoryData,
  }
}
