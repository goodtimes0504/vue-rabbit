import httpInstance from "@/utils/http"
//加入购物车
export const insertCartApi = ({ skuId, count }) => {
  return httpInstance({
    url: "member//cart",
    method: "post",
    data: {
      skuId,
      count,
    },
  })
}
//获取最新购物车列表
export const findNewCartListApi = () => {
  return httpInstance({
    url: "member/cart",
    method: "get",
  })
}
//删除购物车接口
export const delCartApi = (ids) => {
  return httpInstance({
    url: `member/cart`,
    method: "delete",
    data: {
      ids,
    },
  })
}
//合并购物车接口
export const mergeCartApi = (data) => {
  return httpInstance({
    url: "member/cart/merge",
    method: "post",
    data,
  })
}
//之前是下面这么写的 会有bug 因为接口要求的 是数组 你传进来一个数组放到对象里了 就不符合接口要求了 就报错了

// export const mergeCartApi = (cartList) => {
//   return httpInstance({
//     url: "member/cart/merge",
//     method: "post",
//     data: {
//       cartList,
//     },
//   })
// }
