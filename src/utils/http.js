//axios基础的封装
import axios from "axios"
import { ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-message.css"
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "vue-router"

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
})
//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //从pinia获取token数据 然后按照后端的要求拼接token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e),
)

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore()
    const router = useRouter()
    //统一错误提示
    ElMessage.error(e.response.data.message)
    //401 token失效处理 ——清除本地数据 然后 跳转登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push = "/login"
    }

    return Promise.reject(e)
  },
)

//导出实例
export default httpInstance
