import httpInstance from "@/utils/http"

//获取banner轮播图

export function getBannerApi() {
  return httpInstance({
    url: "/home/banner",
    method: "get",
  })
}
