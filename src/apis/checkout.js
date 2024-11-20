import httpInstance from "@/utils/http"

//获取订单详情接口
export const getCheckoutAPI = () => {
  return httpInstance({
    url: "/member/order/pre",
    method: "get",
  })
}
