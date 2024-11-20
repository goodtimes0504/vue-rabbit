//管理用户数据相关
import { defineStore } from "pinia"
import { loginAPI } from "@/apis/user"
import { ref, computed } from "vue"
import { useCartStore } from "./cartStore"
import { mergeCartApi } from "@/apis/cart"
export const useUserStore = defineStore(
  "user",
  () => {
    //定义state
    const userInfo = ref({})
    //定义action
    const getUserInfo = async (data) => {
      const result = await loginAPI(data)
      userInfo.value = result.result
      // debugger
      //登陆时要合并购物车
      await mergeCartApi(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        }),
      )
      //上述操作 获取用户信息 合并购物车后 要重新拉取一下购物车列表
      cartStore.updateNewList()
    }
    //退出时清除用户信息
    const cartStore = useCartStore()
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }
    //   //定义getters
    //   const isLogin = computed(() => {
    //     return !!user.value
    //   })
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
      // isLogin,
    }
  },
  {
    persist: true,
  },
)
