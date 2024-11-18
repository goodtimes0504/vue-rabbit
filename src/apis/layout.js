import httpInstance from "@/utils/http"
//封装一个获取分类的函数
export function getCategoryApi() {
  return httpInstance({
    url: "/home/category/head",
  })
}
