//管理用户数据相关
import { defineStore } from "pinia"
import { loginAPI } from "@/apis/user"
import { ref, computed } from "vue"
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
    const clearUserInfo = () => {
      userInfo.value = {}
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
