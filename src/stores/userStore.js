//管理用户数据相关
import { defineStore } from "pinia"
import { loginAPI } from "@/apis/user"
import { ref, computed } from "vue"
import { useCartStore } from "./cartStore"
export const useUserStore = defineStore(
  "user",
  () => {
    //定义state
    const userInfo = ref({})
    //定义action
    const getUserInfo = async (data) => {
      const result = await loginAPI(data)
      userInfo.value = result.result
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
