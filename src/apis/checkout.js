import httpInstance from "@/utils/http"

//获取订单详情接口
export const getCheckoutAPI = () => {
  return httpInstance({
    url: "/member/order/pre",
    method: "get",
  })
}
//创建订单接口
export const createOrderAPI = (data) => {
  return httpInstance({
    url: "/member/order",
    method: "post",
    data,
  })
}
