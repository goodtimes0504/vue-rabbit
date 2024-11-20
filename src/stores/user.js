//管理用户数据相关
import { defineStore } from "pinia"
import { loginAPI } from "@/apis/user"
import { ref, computed } from "vue"
export const useUserStore = defineStore("user", () => {
  //定义state
  const userInfo = ref({})
  //定义action
  const getUserInfo = async (data) => {
    const result = await loginAPI(data)
    userInfo.value = result.result
  }
  //   //定义getters
  //   const isLogin = computed(() => {
  //     return !!user.value
  //   })
  return {
    userInfo,
    getUserInfo,
    // isLogin,
  }
})
