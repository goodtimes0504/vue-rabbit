//导入封装好的axios实例
import httpInstance from "@/utils/http"
export function getCategory() {
  return httpInstance({
    url: "/home/category/head",
  })
}
