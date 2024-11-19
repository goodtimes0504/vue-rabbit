import httpInstance from "@/utils/http"

//获取banner轮播图

export function getBannerApi() {
  return httpInstance({
    url: "/home/banner",
    method: "get",
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export function findNewAPI() {
  return httpInstance({
    url: "/home/new",
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: "/home/hot",
  })
}
